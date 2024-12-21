import {
  CommandHistory,
  getCompletions,
  executeCommand,
  fileSystem,
} from "../../utils/filesystem";
import { getTimestamp } from "../../utils/time";

export function initializeTerminal() {
  const history = new CommandHistory();
  const terminal = document.getElementById("terminal");
  const input = terminal?.querySelector(".command-text") as HTMLInputElement;

  if (!input) return;

  let currentCompletion: string[] = [];
  let completionIndex = 0;

  input.addEventListener("keydown", handleKeyDown);
  terminal?.addEventListener("click", () => input.focus());
  input.focus();

  function handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "Enter":
        handleCommand(input.value);
        break;
      case "ArrowUp":
        e.preventDefault();
        const prev = history.getPrevious();
        if (prev) input.value = prev;
        break;
      case "ArrowDown":
        e.preventDefault();
        const next = history.getNext();
        if (next) input.value = next;
        break;
      case "Tab":
        e.preventDefault();
        handleTabCompletion();
        break;
    }
  }

  function handleCommand(cmd: string) {
    if (!cmd.trim()) return;

    history.add(cmd);
    const output = executeCommand(cmd.trim());
    appendOutput(cmd, output);
    input.value = "";
    currentCompletion = [];
    updatePrompt();
  }

  function handleTabCompletion() {
    const partial = input.value;
    if (!currentCompletion.length) {
      currentCompletion = getCompletions(partial);
      completionIndex = 0;
    } else {
      completionIndex = (completionIndex + 1) % currentCompletion.length;
    }

    if (currentCompletion.length) {
      input.value = currentCompletion[completionIndex];
    }
  }

  function appendOutput(command: string, output: string[]) {
    const content = terminal?.querySelector(".terminal-content");
    const template = document.createElement("template");
    template.innerHTML = `
      <div class="terminal-output">
        <div class="command-line">
          <span class="timestamp">[${getTimestamp()}]</span>
          <span class="prompt">${fileSystem.getPrompt()}</span>
          <span class="command">${command}</span>
        </div>
        <div class="output">
          ${output.map((line) => `<p>${line}</p>`).join("")}
        </div>
      </div>
    `;
    content?.insertBefore(template.content, input.parentElement);
    input.scrollIntoView({ behavior: "smooth" });
  }

  function updatePrompt() {
    const promptElement = input.parentElement?.querySelector(".prompt");
    if (promptElement) {
      promptElement.textContent = fileSystem.getPrompt();
    }
  }

  function clearTerminal() {
    const content = terminal?.querySelector(".terminal-content");
    const outputs = content?.querySelectorAll(".terminal-output");
    outputs?.forEach((output) => output.remove());
  }
}
