export type Mode = "create" | "upsert" | "update" | "replace" | "delete";

export type JsonObject = Record<string, unknown>;

export interface RuleConfig {
  displayName?: string;
  mailbox?: string;
  ruleFolder?: string;
  mode?: string;
  sequence?: number | string;
  isEnabled?: boolean;
  stopProcessingRules?: boolean;
  moveToFolder?: string;
  moveToFolderId?: string;
  conditions?: {
    subjectContains?: string[];
    senderContains?: string[];
    bodyContains?: string[];
  };
  actions?: {
    moveToFolder?: string;
    moveToFolderId?: string;
    markAsRead?: boolean;
    delete?: boolean;
    assignCategories?: string[];
    stopProcessingRules?: boolean;
  };
}

export interface Options {
  ruleName: string;
  mailbox: string;
  ruleFolder: string;
  mode: Mode;
  sequence: number;
  isEnabled: boolean;
  stopProcessing: boolean;
  moveTo: string;
  moveToFolderId: string;
  markAsRead?: boolean;
  deleteAction?: boolean;
  dryRun: boolean;
  verbose: boolean;
  configFile: string;
  subjectContains: string[];
  senderContains: string[];
  bodyContains: string[];
  assignCategories: string[];
}

export interface MessageRule {
  id?: string;
  displayName?: string;
}

export interface GraphCollection<T> {
  value?: T[];
}

export interface RulePayload {
  displayName: string;
  sequence: number;
  isEnabled: boolean;
  conditions: {
    subjectContains?: string[];
    senderContains?: string[];
    bodyContains?: string[];
  };
  actions: {
    moveToFolder?: string;
    markAsRead?: boolean;
    delete?: boolean;
    assignCategories?: string[];
    stopProcessingRules: boolean;
  };
}
