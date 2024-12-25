import type { ProfileInfo, ProfileField } from "@/types"

// profile information
const profileInfo = {
  name: "Oren Damien Shomrai",
  title: "Software Engineer",
  location: "Israel",
  email: "damien.shomrai@gmail.com",
  languages: ["Node.js", "Python"],
  technologies: ["Docker", "Kubernetes"],
  specialization: ["Backend Development", "Infra"],
  github: "github.com/cartmandos",
  // linkedin: 'linkedin.com/in/damien-shomrai',
  // website: 'damienshomrai.com',
};

export function formatProfileInfo(info: ProfileInfo): ProfileField[] {
  const fields = [
    { label: "User", value: info.name },
    { label: "Title", value: info.title },
    { label: "Location", value: info.location },
    { label: "Email", value: info.email },
    { label: "Languages", value: info.languages.join(", ") },
    { label: "Tech Stack", value: info.technologies.join(", ") },
    { label: "Focus", value: info.specialization.join(", ") },
    ...(info.github ? [{ label: "GitHub", value: info.github }] : []),
    ...(info.linkedin ? [{ label: "LinkedIn", value: info.linkedin }] : []),
  ];

  return fields;
}

export function getProfileInfo(): ProfileField[] {
  return formatProfileInfo(profileInfo);
}
