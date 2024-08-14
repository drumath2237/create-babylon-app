import { colorize } from "consola/utils";
import type { TemplateConfig } from "./templateSelector";

/**
 * define template structure recursively
 */
export const templates: TemplateConfig = {
  message: "Template Type?",
  selections: [
    {
      label: "✨ Simple",
      value: "simple",
      subSelection: {
        message: "Language?",
        selections: [
          { label: `${colorize("blue", "TypeScript")}`, value: "ts" },
          { label: `${colorize("yellow", "JavaScript")}`, value: "js" },
        ],
      },
    },
    {
      label: "🍰 Playground",
      value: "playground",
      subSelection: {
        message: "Language?",
        selections: [
          { label: `${colorize("blue", "TypeScript")}`, value: "ts" },
          { label: `${colorize("yellow", "JavaScript")}`, value: "js" },
        ],
      },
    },
    {
      label: "📦 Library",
      value: "library",
    },
  ],
};
