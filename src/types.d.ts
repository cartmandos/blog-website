export interface ProfileInfo {
    name: string;
    title: string;
    location: string;
    email: string;
    languages: string[];
    technologies: string[];
    specialization: string[];
    github?: string;
    linkedin?: string;
    website?: string;
  }
  
  export interface ProfileField {
    label: string;
    value: string;
  }

  export type ViewMode = "editor" | "preview";

export interface PageProps {
  content: string;
  title?: string;
  initialMode?: ViewMode;
}

export interface MenuItem {
    id: string;
    label: string;
    icon: string;
    type: "file" | "directory";
    path?: string;
    children?: MenuItem[];
  }

  export interface MenuState {
    expanded: boolean;
    collapsedSections: Set<string>;
  }
  