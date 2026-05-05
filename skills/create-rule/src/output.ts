import type { JsonObject, Options, RulePayload } from "./types.ts";
import { log } from "./utils.ts";

export function printDryRun(rulesFolderPath: string, payload: RulePayload, options: Options): void {
  log("Dry run only; no Graph calls will be made.");
  console.log(`Mode: ${options.mode}`);
  console.log(`Mailbox: ${options.mailbox}`);
  console.log(`Rule folder: ${options.ruleFolder}`);
  console.log(`Rules URL: ${rulesFolderPath}/messageRules`);
  if (options.mode === "delete") {
    console.log("Payload: none; delete mode only looks up the rule by display name.");
    return;
  }
  if (options.moveTo && !options.moveToFolderId) {
    console.log("Note: --move-to is not resolved during dry-run; a live run replaces it with the folder id.");
  }
  console.log("\nPayload:");
  console.log(JSON.stringify(payload, null, 2));
}

export function summarizeRule(rule: unknown): void {
  const value = rule && typeof rule === "object" ? (rule as JsonObject) : {};
  console.log(
    JSON.stringify(
      {
        id: value.id,
        displayName: value.displayName,
        isEnabled: value.isEnabled,
        sequence: value.sequence,
        conditions: value.conditions,
        actions: value.actions,
      },
      null,
      2,
    ),
  );
}
