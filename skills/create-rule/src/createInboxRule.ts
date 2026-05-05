#!/usr/bin/env node

import {
  dryRunRuleFolderPath,
  findRuleByName,
  graphDelete,
  graphPatch,
  graphPost,
  mailboxBasePath,
  resolveFolderId,
  resolveRuleFolderPath,
} from "./graph.ts";
import { readOptions } from "./options.ts";
import { printDryRun, summarizeRule } from "./output.ts";
import { buildPayload } from "./payload.ts";
import type { JsonObject } from "./types.ts";
import { debug, fail, log } from "./utils.ts";

async function run(args: string[]): Promise<void> {
  const options = await readOptions(args);
  const basePath = mailboxBasePath(options);
  const token = process.env.GRAPH_TOKEN ?? "";
  const liveToken = options.dryRun ? "" : token || fail("Set GRAPH_TOKEN to a Microsoft Graph access token");

  const ruleFolderPath = options.dryRun
    ? dryRunRuleFolderPath(basePath, options)
    : await resolveRuleFolderPath(basePath, liveToken, options);

  let moveToFolderId = options.moveToFolderId;
  if (!moveToFolderId && options.moveTo) {
    moveToFolderId = options.dryRun
      ? options.moveTo
      : await resolveFolderId(options.moveTo, basePath, liveToken, options);
    if (!moveToFolderId) {
      fail(`move target folder not found: ${options.moveTo}`);
    }
  }

  const payload = buildPayload(options, moveToFolderId);
  if (options.dryRun) {
    printDryRun(ruleFolderPath, payload, options);
    return;
  }

  const rulesUrl = `${ruleFolderPath}/messageRules`;
  debug(options, `Rules URL: ${rulesUrl}`);

  const existingRuleId = await findRuleByName(rulesUrl, liveToken, options);
  const existingRuleUrl = existingRuleId ? `${rulesUrl}/${encodeURIComponent(existingRuleId)}` : "";

  switch (options.mode) {
    case "create": {
      if (existingRuleId) fail(`rule already exists: ${options.ruleName} (${existingRuleId})`);
      log(`Creating inbox rule: ${options.ruleName}`);
      summarizeRule(await graphPost(rulesUrl, liveToken, payload as unknown as JsonObject));
      break;
    }
    case "upsert": {
      if (existingRuleId) {
        log(`Updating existing inbox rule: ${options.ruleName} (${existingRuleId})`);
        summarizeRule(await graphPatch(existingRuleUrl, liveToken, payload as unknown as JsonObject));
      } else {
        log(`Creating inbox rule: ${options.ruleName}`);
        summarizeRule(await graphPost(rulesUrl, liveToken, payload as unknown as JsonObject));
      }
      break;
    }
    case "update": {
      if (!existingRuleId) fail(`rule does not exist: ${options.ruleName}`);
      log(`Updating existing inbox rule: ${options.ruleName} (${existingRuleId})`);
      summarizeRule(await graphPatch(existingRuleUrl, liveToken, payload as unknown as JsonObject));
      break;
    }
    case "replace": {
      if (existingRuleId) {
        log(`Deleting existing inbox rule: ${options.ruleName} (${existingRuleId})`);
        await graphDelete(existingRuleUrl, liveToken);
      }
      log(`Creating inbox rule: ${options.ruleName}`);
      summarizeRule(await graphPost(rulesUrl, liveToken, payload as unknown as JsonObject));
      break;
    }
    case "delete": {
      if (existingRuleId) {
        log(`Deleting inbox rule: ${options.ruleName} (${existingRuleId})`);
        await graphDelete(existingRuleUrl, liveToken);
      } else {
        log(`No matching inbox rule found: ${options.ruleName}`);
      }
      break;
    }
  }

  log("Done. Verify in Outlook: Settings > Mail > Rules.");
}

run(process.argv.slice(2)).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
});
