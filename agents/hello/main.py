"""Simple agent model and demo entrypoint."""

from typing import Callable
# Dataclass utilities for model objects.
from dataclasses import dataclass, field
# Access environment variables (for API key).
import os
# Generic typing helper for mixed-value dict/list types.
from typing import Any
# Pretty terminal output/input rendering.
from rich.console import Console

# HTTP client used to call the OpenAI-compatible API.
import requests
import datetime
import getpass


# Auto-generates __init__, __repr__, and other helper methods.
@dataclass
class Agent:
    # Class purpose.
    """Simple chat agent wrapper for OpenAI-compatible APIs."""

    system_prompt: str = "You are a helpful assistant."

    # Default model name sent to the API.
    model: str = "gpt-4o-mini"

    # Base API URL.
    base_url: str = "https://api.openai.com/v1"

    # Secret token used for bearer authentication.
    api_key: str = field(
        # Load key from env.
        default_factory=lambda: os.getenv("OPENAI_API_KEY", ""),

        # Hide key in object repr so it is not printed accidentally.
        repr=False,
    )

    contexts: dict[str, Callable[[], str]] = field(default_factory=dict)

    # Chat history buffer.
    messages: list[dict[str, Any]] = field(default_factory=list)

    # Runs automatically after dataclass __init__.
    def __post_init__(self):
        # Normalize URL by removing trailing slash.
        self.base_url = self.base_url.rstrip("/")

    def context(self, func: Callable[[], str]) -> Callable[[], str]:
        self.contexts[func.__name__] = func
        return func

    # Send one user turn and receive one assistant turn.
    def chat(self, user_message: str) -> str:
        # Method summary.
        """Send a user message and return the assistant response."""
        # Store user message in history.
        self.messages.append({"role": "user", "content": user_message})

        context_content = "\n\n".join(
            f"<context>\n{n}>{fn()}</{n}>\n</context>"
            for n, fn in self.contexts.items()
        )

        prefix: list[dict[str, Any]] = [
            {"role": "system", "content": self.system_prompt},
            {"role": "system", "content": context_content},
        ]   
        
        # Full endpoint for chat completions.
        url = f"{self.base_url}/chat/completions"

        # HTTP headers sent with the POST request.
        headers = {
            # API auth header.
            "Authorization": f"Bearer {self.api_key}",

            # Body content type.
            "Content-Type": "application/json",
        }

        # Make the network request to the model API.
        r = requests.post(
            # Target endpoint.
            url,

            # Auth + JSON headers.
            headers=headers,

            # JSON body payload.
            json={
                # Which model to use.
                "model": self.model,
                # Full conversation context.
                "messages": prefix + self.messages,
            },
            # Request timeout in seconds.
            timeout=300,
        )

        # Raise if status code indicates error (4xx/5xx).
        r.raise_for_status()

        # Parse JSON response into a Python dict.
        data = r.json()

        # Extract choices array from API response.
        choice = data.get("choices")

        # Validate that at least one choice exists.
        if not choice:
            # Explicit error for missing choices.
            raise RuntimeError("No choice returned from OpenAI API")

        # Pull first assistant message object.
        message = choice[0].get("message")

        # Validate message payload exists.
        if message is None:
            # Explicit error for missing message.
            raise RuntimeError("No message returned from OpenAI API")

        # Extract assistant text safely.
        response = message.get("content") or ""

        # Save assistant reply in history.
        self.messages.append({"role": "assistant", "content": response})

        # Return assistant reply to caller.
        return response


def main():
    # Entry-point function summary.
    """Run a minimal startup check."""
    
    # Startup banner.
    print("JODEX AGENT v0.1.0")

    # Create chat agent instance.
    agent = Agent(
        model="gpt-4o-mini",
        system_prompt="You are a helpful assistant that highlights the current time."
    )

    @agent.context
    def time_context() -> str:
        now = datetime.datetime.now()
        return f"The current hour is {now.hour} o'clock."

    @agent.context
    def user_context() -> str:
        return (
            f"The current date and time is {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}.\n"
            f"The current user is {getpass.getuser()}."
        )

    # Create rich console helper.
    console = Console()

    # Interactive chat loop.
    while True:
        # Prompt label.
        console.print("[green]You:[/green] ", end="")
        
        # Read user input from terminal.
        user_input = console.input()

        # Exit command check.
        if user_input.strip().lower() in ["exit", "quit", "q"]:
            # Exit confirmation message.
            console.print("[red]Exiting...[/red]")
            # Stop the program.
            return

        # Show spinner during API call.
        with console.status("[dim]Thinking...[/dim]", spinner="arc"):
            # Send input to model and get output.
            response = agent.chat(user_input)

        # Print assistant response.
        console.print(f"[bold blue]Jodex:[/bold blue] {response}")


# Run only when executed directly.
if __name__ == "__main__":
    # Start program.
    main()
