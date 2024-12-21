export interface MenuItem {
    id: string;
    label: string;
    icon: string;
    type: 'file' | 'directory';
    path?: string;
    children?: MenuItem[];
  }
  
  export interface MenuState {
    expanded: boolean;
    collapsedSections: Set<string>;
  }