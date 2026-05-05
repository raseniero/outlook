# Agent (Python)

Small interactive CLI chat agent that calls an OpenAI-compatible Chat Completions API.

## What It Does

- Keeps in-memory conversation history (`messages`)
- Sends each user message to `POST /chat/completions`
- Prints assistant replies with a Rich-powered terminal UI
- Exits with `exit`, `quit`, or `q`

## Requirements

- Python 3.12+
- [uv](https://docs.astral.sh/uv/)
- `OPENAI_API_KEY` environment variable

## Setup

From the `agent/` directory:

```bash
uv sync
```

Set your API key:

```bash
export OPENAI_API_KEY="your_api_key_here"
```

Optional (if using a non-default OpenAI-compatible endpoint), instantiate `Agent` with a different `base_url`.

## Run

```bash
uv run main.py
```

You should see:

```text
JODEX AGENT v0.1.0
You:
```

Type a prompt and press Enter.

## Project Files

- `main.py` - Agent class + interactive CLI loop
- `pyproject.toml` - Project metadata and dependencies

## Common Issues

- **`401 Unauthorized`**: `OPENAI_API_KEY` is missing or invalid.
- **`429 Too Many Requests`**: Rate limit/quota exceeded; retry later or reduce request frequency.
- **Import errors in IDE**: Make sure interpreter is `agent/.venv/bin/python`.

## Development

Install dev dependencies (includes type stubs for `requests`):

```bash
uv sync --group dev
```
