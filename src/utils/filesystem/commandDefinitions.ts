export const COMMANDS = {
  help: "Display available commands",
  ls: "List directory contents",
  cd: "Change directory",
  cat: "Display file contents",
  man: "Display manual pages",
  tree: "Display directory structure",
  grep: "Search for patterns in files",
  clear: "Clear terminal screen",
  pwd: "Print working directory",
  top: "Show most viewed posts",
  log: "Show post history",
  diff: "Show file differences",
} as const;

export type CommandType = keyof typeof COMMANDS;
