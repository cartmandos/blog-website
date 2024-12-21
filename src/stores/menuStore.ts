import type { MenuState } from "../types/menu";

class MenuStore {
    private state: MenuState = {
      expanded: false,
      collapsedSections: new Set()
    };
  
    private listeners: Set<() => void> = new Set();
  
    constructor() {
      // Load collapsed sections from localStorage
      const stored = localStorage.getItem('menu-collapsed-sections');
      if (stored) {
        this.state.collapsedSections = new Set(JSON.parse(stored));
      }
    }
  
    getState(): MenuState {
      return this.state;
    }
  
    toggleExpanded(): void {
      this.state.expanded = !this.state.expanded;
      this.notify();
    }
  
    toggleSection(sectionId: string): void {
      if (this.state.collapsedSections.has(sectionId)) {
        this.state.collapsedSections.delete(sectionId);
      } else {
        this.state.collapsedSections.add(sectionId);
      }
      
      // Persist to localStorage
      localStorage.setItem(
        'menu-collapsed-sections',
        JSON.stringify([...this.state.collapsedSections])
      );
      
      this.notify();
    }
  
    subscribe(listener: () => void): () => void {
      this.listeners.add(listener);
      return () => this.listeners.delete(listener);
    }
  
    private notify(): void {
      this.listeners.forEach(listener => listener());
    }
  }
  
  export const menuStore = new MenuStore();