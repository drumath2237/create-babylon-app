type SelectionType = {
  label: string;
  value: string;
  subSelection?: TemplateConfig;
};

type TemplateConfig = {
  message: string;
  selection: Array<SelectionType>;
};

const templates: TemplateConfig = {
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

type SelectionTypeWithoutSub = Omit<SelectionType, "subSelection">;
type SelectorFnType = (arg: {
  message: string;
  selection: Array<SelectionTypeWithoutSub>;
}) => SelectorFnReturnType | Promise<SelectorFnReturnType>;
type SelectorFnReturnType = { index: number };

const constructTemplateNameAsync = async (
  templates: TemplateConfig,
  selector: SelectorFnType,
): Promise<string> => {
  const { index } = await selector(templates);
  const { value, subSelection } = templates.selection[index];

  if (!subSelection) {
    return value;
  }

  const subResult = await constructTemplateNameAsync(subSelection, selector);

  return `${value}-${subResult}`;
};
