export type ViewMode = "editor" | "preview";

export interface PageProps {
  content: string;
  title?: string;
  initialMode?: ViewMode;
}

///

export interface PageState {
  mode: ViewMode;
  lineCount: number;
  scrollPosition: number;
}

//////

// Props for the mode toggle component
export interface ModeToggleProps {
  currentMode: ViewMode;
}

// Props for the editor mode component
export interface EditorModeProps {
  content: string;
  title?: string;
}

// Props for the preview mode component
export interface PreviewModeProps {
  content: string;
  title?: string;
}

// Internal types for content processing
export interface ProcessedContent {
  raw: string;
  html: string;
  lineCount: number;
}
