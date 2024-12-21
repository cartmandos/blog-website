export function getTimestamp(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

export function formatCommandOutput(output: string | string[]): string[] {
  const timestamp = getTimestamp();
  const prefix = `[${timestamp}] `;
  
  if (Array.isArray(output)) {
    return output.map(line => `${prefix}${line}`);
  }
  
  return [`${prefix}${output}`];
}