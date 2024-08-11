export type SelectionType = {
  label: string;
  value: string;
  subSelection?: TemplateConfig;
};

export type TemplateConfig = {
  message: string;
  selections: Array<SelectionType>;
};

export type SelectorFnType = (arg: {
  message: string;
  selections: Array<SelectionType>;
}) => SelectionType | Promise<SelectionType>;

export const constructTemplateNameAsync = async (
  templates: TemplateConfig,
  selector: SelectorFnType,
): Promise<string> => {
  const { value, subSelection } = await selector(templates);
  if (!subSelection) {
    return value;
  }

  const subResult = await constructTemplateNameAsync(subSelection, selector);
  return `${value}-${subResult}`;
};
