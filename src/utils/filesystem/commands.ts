import { FileSystem } from "./FileSystem";
import { COMMANDS } from "./commandDefinitions";

export const fileSystem = new FileSystem();

export function getCompletions(partial: string): string[] {
  return Object.keys(COMMANDS).filter((cmd) => cmd.startsWith(partial));
}

export function executeCommand(cmd: string): string[] {
  const [command, ...args] = cmd.trim().split(/\s+/);

  switch (command) {
    case "help":
      return Object.entries(COMMANDS).map(
        ([cmd, desc]) => `${cmd.padEnd(15)} - ${desc}`,
      );

    case "ls":
      return fileSystem.ls(args[0]);

    case "cd":
      return fileSystem.cd(args[0] || "~");

    case "cat":
      return args.length ? fileSystem.cat(args[0]) : ["Usage: cat <file>"];

    case "man":
      return args.length
        ? fileSystem.man(args[0])
        : ["What manual page do you want?"];

    case "tree":
      return fileSystem.tree(args[0]);

    case "grep":
      if (args.length < 1) return ["Usage: grep <pattern> [path]"];
      return fileSystem.grep(args[0], args[1]);

    case "pwd":
      return [fileSystem.getCurrentPath()];

    case "clear":
      return [];

    default:
      return [
        `Command not found: ${command}. Type 'help' for available commands.`,
      ];
  }
}

export function getPathCompletions(path: string): string[] {
  const parts = path.split("/");
  const searchDir = parts.slice(0, -1).join("/") || "/";
  const prefix = parts[parts.length - 1];

  return fileSystem
    .ls(searchDir)
    .filter((name) => name.startsWith(prefix))
    .map((name) => {
      const fullPath = `${searchDir}/${name}`.replace(/\/+/g, "/");
      const node = fileSystem.getNodeAtPath(fullPath);
      return node?.type === "directory" ? `${fullPath}/` : fullPath;
    });
}
