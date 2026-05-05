import type { GraphCollection, JsonObject, MessageRule, Options } from "./types.ts";
import { debug, fail } from "./utils.ts";

export const graphBase = process.env.GRAPH ?? "https://graph.microsoft.com/v1.0";

const wellKnownFolders = new Set([
  "archive",
  "clutter",
  "conflicts",
  "conversationhistory",
  "deleteditems",
  "drafts",
  "inbox",
  "junkemail",
  "localfailures",
  "msgfolderroot",
  "outbox",
  "recoverableitemsdeletions",
  "scheduled",
  "searchfolders",
  "sentitems",
  "serverfailures",
  "syncissues",
]);

export function mailboxBasePath(options: Options): string {
  if (options.mailbox === "me") {
    return `${graphBase}/me`;
  }
  return `${graphBase}/users/${encodeURIComponent(options.mailbox)}`;
}

export function dryRunRuleFolderPath(basePath: string, options: Options): string {
  if (isWellKnownFolder(options.ruleFolder)) {
    return `${basePath}/mailFolders/${encodeURIComponent(options.ruleFolder.toLowerCase())}`;
  }
  return `${basePath}/mailFolders/${options.ruleFolder}`;
}

export async function resolveFolderId(
  folder: string,
  basePath: string,
  token: string,
  options: Options,
): Promise<string> {
  if (folder.startsWith("id:")) {
    return folder.slice("id:".length);
  }

  if (isWellKnownFolder(folder)) {
    const encodedFolder = encodeURIComponent(folder.toLowerCase());
    debug(options, `Resolving well-known folder: ${folder}`);
    const result = await graphGet<{ id?: string }>(
      `${basePath}/mailFolders/${encodedFolder}?${queryString({ "$select": "id,displayName" })}`,
      token,
    );
    return result.id ?? "";
  }

  debug(options, `Resolving folder by displayName: ${folder}`);
  const result = await graphGet<GraphCollection<{ id?: string }>>(
    `${basePath}/mailFolders?${queryString({
      "$filter": odataDisplayNameFilter(folder),
      "$select": "id,displayName",
    })}`,
    token,
  );
  return result.value?.[0]?.id ?? "";
}

export async function resolveRuleFolderPath(basePath: string, token: string, options: Options): Promise<string> {
  if (isWellKnownFolder(options.ruleFolder)) {
    return `${basePath}/mailFolders/${encodeURIComponent(options.ruleFolder.toLowerCase())}`;
  }

  const folderId = await resolveFolderId(options.ruleFolder, basePath, token, options);
  if (!folderId) {
    fail(`rule folder not found: ${options.ruleFolder}`);
  }
  return `${basePath}/mailFolders/${encodeURIComponent(folderId)}`;
}

export async function findRuleByName(rulesUrl: string, token: string, options: Options): Promise<string> {
  const result = await graphGet<GraphCollection<MessageRule>>(
    `${rulesUrl}?${queryString({ "$select": "id,displayName,isEnabled,sequence" })}`,
    token,
  );
  return result.value?.find((rule) => rule.displayName === options.ruleName)?.id ?? "";
}

export function graphPost<T>(url: string, token: string, body: JsonObject): Promise<T> {
  return graphRequest<T>("POST", url, token, body);
}

export function graphPatch<T>(url: string, token: string, body: JsonObject): Promise<T> {
  return graphRequest<T>("PATCH", url, token, body);
}

export function graphDelete(url: string, token: string): Promise<void> {
  return graphRequest<void>("DELETE", url, token);
}

function isWellKnownFolder(folder: string): boolean {
  return wellKnownFolders.has(folder.toLowerCase());
}

function odataDisplayNameFilter(displayName: string): string {
  return `displayName eq '${displayName.replaceAll("'", "''")}'`;
}

function queryString(params: Record<string, string>): string {
  return new URLSearchParams(params).toString();
}

function graphGet<T>(url: string, token: string): Promise<T> {
  return graphRequest<T>("GET", url, token);
}

async function graphRequest<T>(
  method: string,
  url: string,
  token: string,
  body?: JsonObject,
): Promise<T> {
  const requestInit: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
  };
  if (body) {
    requestInit.body = JSON.stringify(body);
  }

  const response = await fetch(url, requestInit);
  const text = await response.text();
  if (!response.ok) {
    if (text) {
      console.error(text);
    }
    if (response.status === 401) {
      fail("Graph returned 401. Check that GRAPH_TOKEN is present and not expired.");
    }
    if (response.status === 403) {
      fail(
        "Graph returned 403. Check Graph consent and MailboxSettings.ReadWrite plus mail folder read permissions.",
      );
    }
    fail(`Graph returned HTTP ${response.status} for ${method} ${url}`);
  }

  if (!text) {
    return undefined as T;
  }
  return JSON.parse(text) as T;
}
