export type SelectionType = {
  label: string;
  value: string;
  subSelection?: TemplateConfig;
};

export type TemplateConfig = {
  message: string;
  selections: Array<SelectionType>;
};

export type SelectorFnType = (
  arg: TemplateConfig,
) => SelectionType | Promise<SelectionType>;

/**
 * create template name from template confg
 * @param templates list of templates configs
 * @param selector a function that describes how to choose a selection from selections
 * @returns template name
 */
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
