export type SelectionType = {
  label: string;
  value: string;
  subSelection?: TemplateConfig;
};

export type TemplateConfig = {
  message: string;
  selection: Array<SelectionType>;
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
