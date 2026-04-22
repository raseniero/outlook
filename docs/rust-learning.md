# Rust learning path for this Outlook project

Rust is a useful language to learn, but it should not be the first production
implementation for this Microsoft Graph workflow. The TypeScript CLI is a better
fit for the live Outlook integration because OAuth, JSON, async HTTP, and SDK
examples are smoother there.

Use Rust here as a parallel learning track.

## Suggested progression

1. Build a tiny Rust CLI that reads one rule JSON file and prints the normalized
   rule payload.
2. Add typed config structs with `serde` and `serde_json`.
3. Add CLI parsing with `clap`.
4. Add dry-run validation matching the TypeScript CLI behavior.
5. Add HTTP calls with `reqwest` and `tokio`.
6. Only after that, experiment with Graph authentication and token handling.

## Crates to learn

- `clap`: command-line argument parsing.
- `serde`: typed JSON serialization and deserialization.
- `serde_json`: JSON file parsing and payload output.
- `reqwest`: HTTP client for Graph requests.
- `tokio`: async runtime for `reqwest`.
- `anyhow`: pragmatic error handling for CLI tools.

## Good first Rust exercise

Implement a command like this without calling Microsoft Graph:

```bash
cargo run -- \
  --config rules/auto-replies.json \
  --dry-run
```

The output should match the TypeScript dry-run payload. This keeps the Rust
exercise focused on ownership, structs, enums, error handling, and JSON before
adding OAuth or live network behavior.

## When Rust would become a serious option

Rust becomes worth considering if this project turns into a long-running daemon,
a single static binary for deployment, or a high-reliability worker where memory
safety and strict compile-time guarantees matter more than development speed.
