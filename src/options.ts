import { readFile } from "node:fs/promises";

import type { Mode, Options, RuleConfig } from "./types.ts";
import { fail, parseBoolean } from "./utils.ts";

export function defaultOptions(): Options {
  return {
    ruleName: "",
    mailbox: "me",
    ruleFolder: "inbox",
    mode: "upsert",
    sequence: 1,
    isEnabled: true,
    stopProcessing: true,
    moveTo: "",
    moveToFolderId: "",
    dryRun: false,
    verbose: false,
    configFile: "",
    subjectContains: [],
    senderContains: [],
    bodyContains: [],
    assignCategories: [],
  };
}

export function usage(): string {
  return `Usage:
  create_inbox_rule.sh [options]
  npm run create-rule -- [options]
  npm run create-rule -- --config rules/example.json [options]

Required:
  --name NAME                         Rule display name, unless provided by config.
  At least one condition, unless mode is delete or provided by config:
    --subject-contains TEXT           Repeatable.
    --sender-contains TEXT            Repeatable.
    --body-contains TEXT              Repeatable.

Actions:
  --move-to FOLDER                    Well-known folder name or display name.
                                      Examples: archive, inbox, junkemail, "Receipts"
  --move-to-folder-id ID              Use a Graph folder id directly.
  --mark-as-read                      Mark matching messages as read.
  --delete                            Move matching messages to Deleted Items.
  --assign-category NAME              Repeatable.
  --stop-processing true|false        Default: true.

Target:
  --mailbox me|USER_ID_OR_UPN         Default: me.
  --rule-folder FOLDER                Folder whose messageRules collection is used.
                                      Default: inbox.

Lifecycle:
  --mode create|upsert|update|replace|delete
                                      Default: upsert.

Other:
  --config FILE                       Load reusable JSON config. CLI options override
                                      scalar config values and append array values.
  --sequence N                        Default: 1.
  --enabled                           Default.
  --disabled
  --dry-run                           Print the Graph payload and planned action.
                                      Does not call Graph or require GRAPH_TOKEN.
  --verbose                           Print selected Graph URLs and ids.
  -h, --help

Environment:
  GRAPH_TOKEN                         Microsoft Graph access token.
  GRAPH                               Optional Graph base URL. Default:
                                      https://graph.microsoft.com/v1.0`;
}

export async function readOptions(args: string[]): Promise<Options> {
  const options = defaultOptions();
  const configFile = findConfigArg(args);

  if (configFile) {
    loadConfigIntoOptions(await readConfig(configFile), options);
  }

  parseArgs(args, options);
  validateInputs(options);
  return options;
}

function parseMode(value: string): Mode {
  const normalized = value.toLowerCase();
  if (
    normalized === "create" ||
    normalized === "upsert" ||
    normalized === "update" ||
    normalized === "replace" ||
    normalized === "delete"
  ) {
    return normalized;
  }
  fail("--mode must be one of: create, upsert, update, replace, delete");
}

function getValue(args: string[], index: number, optionName: string): string {
  const value = args[index + 1];
  if (!value) {
    fail(`${optionName} requires a value`);
  }
  return value;
}

function findConfigArg(args: string[]): string {
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === "--config") {
      return getValue(args, index, "--config");
    }
  }
  return "";
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function loadConfigIntoOptions(config: RuleConfig, options: Options): void {
  if (typeof config.displayName === "string") options.ruleName = config.displayName;
  if (typeof config.mailbox === "string") options.mailbox = config.mailbox;
  if (typeof config.ruleFolder === "string") options.ruleFolder = config.ruleFolder;
  if (typeof config.mode === "string") options.mode = parseMode(config.mode);

  if (typeof config.sequence === "number") {
    options.sequence = config.sequence;
  } else if (typeof config.sequence === "string") {
    options.sequence = parseSequence(config.sequence);
  }

  if (typeof config.isEnabled === "boolean") options.isEnabled = config.isEnabled;

  const stopProcessing = config.actions?.stopProcessingRules ?? config.stopProcessingRules;
  if (typeof stopProcessing === "boolean") options.stopProcessing = stopProcessing;

  const moveTo = config.actions?.moveToFolder ?? config.moveToFolder;
  if (typeof moveTo === "string") options.moveTo = moveTo;

  const moveToFolderId = config.actions?.moveToFolderId ?? config.moveToFolderId;
  if (typeof moveToFolderId === "string") options.moveToFolderId = moveToFolderId;

  if (typeof config.actions?.markAsRead === "boolean") {
    options.markAsRead = config.actions.markAsRead;
  }
  if (typeof config.actions?.delete === "boolean") {
    options.deleteAction = config.actions.delete;
  }

  if (isStringArray(config.conditions?.subjectContains)) {
    options.subjectContains.push(...config.conditions.subjectContains);
  }
  if (isStringArray(config.conditions?.senderContains)) {
    options.senderContains.push(...config.conditions.senderContains);
  }
  if (isStringArray(config.conditions?.bodyContains)) {
    options.bodyContains.push(...config.conditions.bodyContains);
  }
  if (isStringArray(config.actions?.assignCategories)) {
    options.assignCategories.push(...config.actions.assignCategories);
  }
}

async function readConfig(path: string): Promise<RuleConfig> {
  const rawConfig = await readFile(path, "utf8");
  const parsed = JSON.parse(rawConfig) as unknown;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    fail(`config file must contain a JSON object: ${path}`);
  }
  return parsed as RuleConfig;
}

function parseSequence(value: string): number {
  if (!/^\d+$/.test(value)) {
    fail("--sequence must be a non-negative integer");
  }
  return Number(value);
}

function parseArgs(args: string[], options: Options): void {
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    switch (arg) {
      case "--config":
        options.configFile = getValue(args, index, "--config");
        index += 1;
        break;
      case "--name":
        options.ruleName = getValue(args, index, "--name");
        index += 1;
        break;
      case "--mailbox":
        options.mailbox = getValue(args, index, "--mailbox");
        index += 1;
        break;
      case "--rule-folder":
        options.ruleFolder = getValue(args, index, "--rule-folder");
        index += 1;
        break;
      case "--mode":
        options.mode = parseMode(getValue(args, index, "--mode"));
        index += 1;
        break;
      case "--sequence":
        options.sequence = parseSequence(getValue(args, index, "--sequence"));
        index += 1;
        break;
      case "--enabled":
        options.isEnabled = true;
        break;
      case "--disabled":
        options.isEnabled = false;
        break;
      case "--subject-contains":
        options.subjectContains.push(getValue(args, index, "--subject-contains"));
        index += 1;
        break;
      case "--sender-contains":
        options.senderContains.push(getValue(args, index, "--sender-contains"));
        index += 1;
        break;
      case "--body-contains":
        options.bodyContains.push(getValue(args, index, "--body-contains"));
        index += 1;
        break;
      case "--move-to":
        options.moveTo = getValue(args, index, "--move-to");
        options.moveToFolderId = "";
        delete options.deleteAction;
        index += 1;
        break;
      case "--move-to-folder-id":
        options.moveToFolderId = getValue(args, index, "--move-to-folder-id");
        options.moveTo = "";
        delete options.deleteAction;
        index += 1;
        break;
      case "--mark-as-read":
        options.markAsRead = true;
        break;
      case "--delete":
        options.deleteAction = true;
        options.moveTo = "";
        options.moveToFolderId = "";
        break;
      case "--assign-category":
        options.assignCategories.push(getValue(args, index, "--assign-category"));
        index += 1;
        break;
      case "--stop-processing":
        options.stopProcessing = parseBoolean(getValue(args, index, "--stop-processing"));
        index += 1;
        break;
      case "--dry-run":
        options.dryRun = true;
        break;
      case "--verbose":
        options.verbose = true;
        break;
      case "-h":
      case "--help":
        console.log(usage());
        process.exit(0);
        break;
      default:
        fail(`unknown option: ${arg}`);
    }
  }
}

function validateInputs(options: Options): void {
  if (!options.ruleName) {
    fail("--name is required");
  }

  if (
    options.mode !== "delete" &&
    options.subjectContains.length === 0 &&
    options.senderContains.length === 0 &&
    options.bodyContains.length === 0
  ) {
    fail("at least one supported condition is required");
  }

  if (options.moveTo && options.moveToFolderId) {
    fail("use only one of --move-to or --move-to-folder-id");
  }

  if ((options.moveTo || options.moveToFolderId) && options.deleteAction === true) {
    fail("use only one terminal action: move-to, move-to-folder-id, or delete");
  }
}
