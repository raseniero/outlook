import type { Options, RulePayload } from "./types.ts";

export function buildPayload(options: Options, moveToFolderId: string): RulePayload {
  const payload: RulePayload = {
    displayName: options.ruleName,
    sequence: options.sequence,
    isEnabled: options.isEnabled,
    conditions: {},
    actions: {
      stopProcessingRules: options.stopProcessing,
    },
  };

  if (options.subjectContains.length > 0) {
    payload.conditions.subjectContains = options.subjectContains;
  }
  if (options.senderContains.length > 0) {
    payload.conditions.senderContains = options.senderContains;
  }
  if (options.bodyContains.length > 0) {
    payload.conditions.bodyContains = options.bodyContains;
  }
  if (moveToFolderId) {
    payload.actions.moveToFolder = moveToFolderId;
  }
  if (options.markAsRead !== undefined) {
    payload.actions.markAsRead = options.markAsRead;
  }
  if (options.deleteAction !== undefined) {
    payload.actions.delete = options.deleteAction;
  }
  if (options.assignCategories.length > 0) {
    payload.actions.assignCategories = options.assignCategories;
  }

  return payload;
}
