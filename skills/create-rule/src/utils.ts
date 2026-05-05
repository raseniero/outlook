import type { Options } from "./types.ts";

export function fail(message: string): never {
  throw new Error(message);
}

export function log(message: string): void {
  console.log(`==> ${message}`);
}

export function debug(options: Options, message: string): void {
  if (options.verbose) {
    console.error(`    ${message}`);
  }
}

export function parseBoolean(value: string): boolean {
  switch (value.toLowerCase()) {
    case "true":
    case "1":
    case "yes":
    case "y":
    case "on":
      return true;
    case "false":
    case "0":
    case "no":
    case "n":
    case "off":
      return false;
    default:
      fail(`expected boolean true or false, got: ${value}`);
  }
}
