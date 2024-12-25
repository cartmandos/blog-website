import type { ViewMode } from "@/types"

class PageStore {
  private state = new Map<string, ViewMode>();

  getMode(pageId: string): ViewMode {
    return this.state.get(pageId) || "preview";
  }

  setMode(pageId: string, mode: ViewMode) {
    this.state.set(pageId, mode);
    localStorage.setItem(`page-mode-${pageId}`, mode);
  }

  loadStoredMode(pageId: string): ViewMode {
    const stored = localStorage.getItem(`page-mode-${pageId}`);
    const mode = (stored as ViewMode) || "preview";
    this.state.set(pageId, mode);
    return mode;
  }
}

export const pageStore = new PageStore();
