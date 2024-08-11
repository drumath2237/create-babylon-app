export type SelectionType = {
  label: string;
  value: string;
  subSelection?: TemplateConfig;
};

export type TemplateConfig = {
  message: string;
  selection: Array<SelectionType>;
};

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

export type SelectionTypeWithoutSub = Omit<SelectionType, "subSelection">;

export type SelectorFnType = (arg: {
  message: string;
  selection: Array<SelectionTypeWithoutSub>;
}) => SelectorFnReturnType | Promise<SelectorFnReturnType>;

export type SelectorFnReturnType = { index: number };

export const constructTemplateNameAsync = async (
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
