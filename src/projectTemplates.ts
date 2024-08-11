import type { TemplateConfig } from "./templateSelector";

export const templates: TemplateConfig = {
  message: "Select Template Type",
  selection: [
    {
      label: "✨ Simple",
      value: "simple",
      subSelection: {
        message: "Select Language",
        selection: [
          { label: "TypeScript", value: "ts" },
          { label: "JavaScript", value: "js" },
        ],
      },
    },
    {
      label: "🍰 Playground",
      value: "playground",
      subSelection: {
        message: "Select Language",
        selection: [
          { label: "TypeScript", value: "ts" },
          { label: "JavaScript", value: "js" },
        ],
      },
    },
    {
      label: "📦 Library",
      value: "library",
    },
  ],
};
