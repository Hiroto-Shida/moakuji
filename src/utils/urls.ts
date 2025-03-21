export const urlJoin = (baseUrl: string, path: string): string => {
  return new URL(path, baseUrl).toString();
};
