export const replacer = (fromWhatToReplace: string, object: Record<string, unknown>): string => {
  return Object.keys(object).reduce((template, key) => {
    return template.split("{" + key + "}").join(<string>object[key]);
  }, fromWhatToReplace);
};
