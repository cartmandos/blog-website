import type { MarkdownHeading } from "astro"
import { getEntry, render, type CollectionEntry } from "astro:content"
import path from "node:path"

interface ModuleContent {
  Content: any
  getHeadings: () => MarkdownHeading[]
  rawContent: () => string
  frontmatter: Record<string, any>
}

export interface RenderedContent {
  Content: import("astro/runtime/server/index.js").AstroComponentFactory
  headings: MarkdownHeading[]
  rawContent: string
  metadata: Record<string, unknown>
  // metadata: CollectionEntry<"blog">["data"] | Record<string, unknown>
}

const MARKDOWN_FILE_DIR = "/src/data"

// Use Vite's import.meta.glob to dynamically import all markdown files
const modules = import.meta.glob<ModuleContent>(`/src/data/**/*.md`, {
  eager: true,
})

const normalizePath = (path: string) =>
  path.replace(/^\//, "").replace(/[^a-zA-Z0-9-_]/g, "")

const getModule = (id: string) => {
  const normalizedFileName = `${normalizePath(id)}.md`
  const filePath = path.join(MARKDOWN_FILE_DIR, normalizedFileName)

  if (!(filePath in modules)) {
    throw new Error(`Module not found: ${filePath}`)
  }

  return modules[filePath]
}

export const loadCollectionContent = async (
  collection: "blog",
  id: string,
): Promise<RenderedContent> => {
  const entry = await getEntry(collection, id)
  if (!entry) {
    throw new Error(`No entry found for id: ${id}`)
  }

  const { Content, headings } = await render(entry)
  return {
    Content,
    headings,
    metadata: entry.data || {},
    rawContent: entry.body || "",
  }
}

export async function loadDynamicContent(id: string): Promise<RenderedContent> {
  try {
    const module = getModule(id)

    return {
      Content: module.Content,
      // headings: module.getHeadings?.() || [],
      headings: [],
      rawContent: module.rawContent?.() || "",
      metadata: module.frontmatter || {},
    }
  } catch (err) {
    throw new Error(`Failed to load content. ${err}`)
  }
}
