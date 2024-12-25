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
