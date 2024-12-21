export interface FileSystemNode {
  name: string;
  type: "file" | "directory";
  content?: string;
  children?: Record<string, FileSystemNode>;
}

export class FileSystem {
  private root: FileSystemNode = {
    name: "/",
    type: "directory",
    children: {},
  };
  private currentPath: string[] = [];

  constructor() {
    this.initializeFileSystem();
  }

  private initializeFileSystem() {
    // About section
    this.createFile(
      "/about.md",
      `
# Oren Damien Shomrai - Software Engineer

## Overview
Senior Software Engineer with expertise in full-stack development,
cloud architecture, and DevOps practices.

## Location
San Francisco, CA

## Contact
- Email: john.doe@example.com
- GitHub: github.com/johndoe
- LinkedIn: linkedin.com/in/johndoe
    `,
    );

    // Projects directory
    this.createDirectory("/projects");
    this.createFile(
      "/projects/cloud-platform.md",
      `
# Cloud Platform Project

## Overview
Led development of a cloud-native platform serving 1M+ users.

## Technologies
- Kubernetes
- Docker
- AWS
- Node.js
    `,
    );

    // Skills directory
    this.createDirectory("/skills");
    this.createFile(
      "/skills/technical.md",
      `
# Technical Skills

## Languages
- JavaScript/TypeScript
- Python
- Go
- Rust

## Frameworks
- React
- Vue.js
- Node.js
- Django
    `,
    );

    // Blog directory
    this.createDirectory("/blog");
    this.createFile(
      "/blog/microservices-2024.md",
      `
# Building Scalable Microservices in 2024

Date: 2024-01-15

Insights and best practices for building microservices
that scale effectively in modern cloud environments.
    `,
    );
  }

  getCurrentPath(): string {
    return "/" + this.currentPath.join("/");
  }

  getPrompt(): string {
    const path = this.getCurrentPath().replace(/^\/+/, "") || "~";
    return `guest@portfolio:${path}$`;
  }

  createDirectory(path: string): void {
    const parts = path.split("/").filter(Boolean);
    let current = this.root;

    for (const part of parts) {
      if (!current.children) {
        current.children = {};
      }
      if (!current.children[part]) {
        current.children[part] = {
          name: part,
          type: "directory",
          children: {},
        };
      }
      current = current.children[part];
    }
  }

  createFile(path: string, content: string): void {
    const parts = path.split("/").filter(Boolean);
    const fileName = parts.pop()!;
    let current = this.root;

    for (const part of parts) {
      if (!current.children) {
        current.children = {};
      }
      if (!current.children[part]) {
        current.children[part] = {
          name: part,
          type: "directory",
          children: {},
        };
      }
      current = current.children[part];
    }

    if (!current.children) {
      current.children = {};
    }
    current.children[fileName] = {
      name: fileName,
      type: "file",
      content,
    };
  }

  cd(path: string): string[] {
    if (path === "/") {
      this.currentPath = [];
      return [];
    }

    if (path === "..") {
      this.currentPath.pop();
      return [];
    }

    const targetPath = path.startsWith("/")
      ? path.split("/").filter(Boolean)
      : [...this.currentPath, ...path.split("/").filter(Boolean)];

    let current = this.root;
    for (const part of targetPath) {
      if (
        !current.children?.[part] ||
        current.children[part].type !== "directory"
      ) {
        return [`cd: ${path}: No such directory`];
      }
      current = current.children[part];
    }

    this.currentPath = targetPath;
    return [];
  }

  ls(path?: string): string[] {
    const targetNode = this.getNodeAtPath(path || this.getCurrentPath());
    if (!targetNode) {
      return [`ls: ${path}: No such file or directory`];
    }

    if (targetNode.type === "file") {
      return [targetNode.name];
    }

    return Object.entries(targetNode.children || {})
      .map(([name, node]) => {
        return node.type === "directory" ? `${name}/` : name;
      })
      .sort();
  }

  cat(path: string): string[] {
    const node = this.getNodeAtPath(path);
    if (!node) {
      return [`cat: ${path}: No such file or directory`];
    }

    if (node.type === "directory") {
      return [`cat: ${path}: Is a directory`];
    }

    return node.content?.split("\n") || [];
  }

  man(command: string): string[] {
    const manPages: Record<string, string[]> = {
      ls: [
        "NAME",
        "    ls - list directory contents",
        "",
        "SYNOPSIS",
        "    ls [path]",
        "",
        "DESCRIPTION",
        "    List information about files and directories.",
        "    When no path is given, list the current directory.",
      ],
      cd: [
        "NAME",
        "    cd - change directory",
        "",
        "SYNOPSIS",
        "    cd [directory]",
        "",
        "DESCRIPTION",
        "    Change the current working directory.",
        "    If no directory is specified, changes to home directory.",
      ],
      cat: [
        "NAME",
        "    cat - concatenate and display files",
        "",
        "SYNOPSIS",
        "    cat [file]",
        "",
        "DESCRIPTION",
        "    Display the contents of specified files.",
      ],
    };

    return manPages[command] || [`No manual entry for ${command}`];
  }

  tree(path?: string): string[] {
    const node = this.getNodeAtPath(path || this.getCurrentPath());
    if (!node) {
      return [`tree: ${path}: No such file or directory`];
    }

    const output: string[] = [];
    this.renderTree(node, "", true, output);
    return output;
  }

  grep(pattern: string, path?: string): string[] {
    const results: string[] = [];
    const regex = new RegExp(pattern, "i");

    const searchNode = (node: FileSystemNode, nodePath: string) => {
      if (node.type === "file" && node.content) {
        const lines = node.content.split("\n");
        lines.forEach((line, index) => {
          if (regex.test(line)) {
            results.push(`${nodePath}:${index + 1}: ${line.trim()}`);
          }
        });
      }

      if (node.children) {
        Object.entries(node.children).forEach(([name, childNode]) => {
          searchNode(childNode, `${nodePath}/${name}`);
        });
      }
    };

    const startNode = path
      ? this.getNodeAtPath(path)
      : this.getNodeAtPath(this.getCurrentPath());

    if (!startNode) {
      return [`grep: ${path}: No such file or directory`];
    }

    searchNode(startNode, path || this.getCurrentPath());
    return results.length > 0 ? results : [`No matches found for: ${pattern}`];
  }

  private getNodeAtPath(path: string): FileSystemNode | null {
    const parts = path.startsWith("/")
      ? path.split("/").filter(Boolean)
      : [...this.currentPath, ...path.split("/").filter(Boolean)];

    let current = this.root;
    for (const part of parts) {
      if (!current.children?.[part]) {
        return null;
      }
      current = current.children[part];
    }
    return current;
  }

  private renderTree(
    node: FileSystemNode,
    prefix: string,
    isLast: boolean,
    output: string[],
  ): void {
    const marker = isLast ? "└── " : "├── ";
    output.push(
      prefix + marker + node.name + (node.type === "directory" ? "/" : ""),
    );

    if (node.children) {
      const entries = Object.entries(node.children);
      entries.forEach(([_, childNode], index) => {
        const newPrefix = prefix + (isLast ? "    " : "│   ");
        this.renderTree(
          childNode,
          newPrefix,
          index === entries.length - 1,
          output,
        );
      });
    }
  }
}
