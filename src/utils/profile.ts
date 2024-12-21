// types/profile.ts
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

export function formatProfileInfo(info: ProfileInfo): string[] {
  const colorize = (text: string) => `<span class="info-label">${text}</span>`; // Green color for labels

  return [
    `${colorize('User')}: ${info.name}`,
    `<span class="info-label">Title</span>: ${info.title}`,
    `<span class="info-label">Location</span>: ${info.location}`,
    `<span class="info-label">Email</span>: ${info.email}`,
    `<span class="info-label">Languages</span>: ${info.languages.join(', ')}`,
    `<span class="info-label">Tech Stack</span>: ${info.technologies.join(', ')}`,
    `<span class="info-label">Focus</span>: ${info.specialization.join(', ')}`,
    ...(info.github ? [`<span class="info-label">GitHub</span>: ${info.github}`] : []),
    ...(info.linkedin ? [`<span class="info-label">LinkedIn</span>: ${info.linkedin}`] : []),
  ];
}
