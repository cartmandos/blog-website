// Astro types, not necessary if you already have a tsconfig.json
/// <reference path="../.astro/types.d.ts" />

interface Window {
  // Add types for global context here
  executeCommand: (cmd: string) => string[];
  matrixAnimation: MatrixAnimation;
}
