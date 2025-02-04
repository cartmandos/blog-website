export async function loadAsciiArt(filepath: string): Promise<string> {
  try {
    // Using dynamic filepath with type safety
    const modules = import.meta.glob<string>("/public/ascii/**/*.txt", {
      query: '?raw',
      import: 'default',
      eager: true,
    });

    // Check if the requested file exists
    const fullPath = `/public/ascii/${filepath}`;
    if (!(fullPath in modules)) {
      throw new Error(`ASCII art file not found: ${filepath}`);
    }

    return modules[fullPath];
  } catch (error) {
    console.error("Failed to load ASCII art:", error);
    throw error;
  }
}
