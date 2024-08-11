type TemplateLangType = "js" | "ts";

type TemplateKindType = "playground" | "simple";

type TemplatesType = `${TemplateKindType}-${TemplateLangType}` | "library";

interface ITemplateConfig {
  message: string;
  selection: Array<{
    label: string;
    value: string;
    subSelection?: ITemplateConfig;
  }>;
}

const templates: ITemplateConfig = {
  message: "Select Template Type",
  selection: [
    {
      label: "✨Simple",
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
      label: "🏝️Playground",
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
      label: "📦Library",
      value: "library",
    },
  ],
};

const constructTemplateNameAsync = (
  templates: ITemplateConfig,
  selector: (arg: {
    message: string;
    selection: Array<{ label: string; value: string }>;
  }) => Promise<{ index: number }>,
): Promise<string> => {
  throw new Error("Not Implemeted Error");
};
