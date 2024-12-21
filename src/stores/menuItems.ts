import type { MenuItem } from "../types/menu";

export const menuItems: MenuItem[] = [
  {
    id: "about",
    label: "About",
    icon: "ph-user",
    type: "directory",
    children: [
      {
        id: "profile",
        label: "Profile",
        icon: "ph-identification",
        type: "file",
        path: "/about",
      },
      {
        id: "experience",
        label: "Experience",
        icon: "ph-briefcase",
        type: "file",
        path: "/experience",
      },
      {
        id: "skills",
        label: "Skills",
        icon: "ph-code",
        type: "file",
        path: "/skills",
      },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    icon: "ph-folder",
    type: "directory",
    children: [
      {
        id: "featured",
        label: "Featured",
        icon: "ph-star",
        type: "file",
        path: "/projects/featured",
      },
      {
        id: "all-projects",
        label: "All Projects",
        icon: "ph-files",
        type: "file",
        path: "/projects",
      },
      {
        id: "case-studies",
        label: "Case Studies",
        icon: "ph-folder",
        type: "directory",
        children: [
          {
            id: "project-1",
            label: "Project 1",
            icon: "ph-file-text",
            type: "file",
            path: "/projects/case-studies/1",
          },
          {
            id: "project-2",
            label: "Project 2",
            icon: "ph-file-text",
            type: "file",
            path: "/projects/case-studies/2",
          },
        ],
      },
    ],
  },
  {
    id: "blog",
    label: "Blog",
    icon: "ph-newspaper",
    type: "directory",
    children: [
      {
        id: "all-posts",
        label: "All Posts",
        icon: "ph-files",
        type: "file",
        path: "/blog",
      },
      {
        id: "categories",
        label: "Categories",
        icon: "ph-tag",
        type: "file",
        path: "/blog/categories",
      },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    icon: "ph-envelope",
    type: "directory",
    children: [
      {
        id: "get-in-touch",
        label: "Get in Touch",
        icon: "ph-chat-circle",
        type: "file",
        path: "/contact",
      },
    ],
  },
];
