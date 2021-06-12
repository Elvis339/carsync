import path from "path";

export const getRootPath = (): string => {
  return path.dirname(require.main.filename);
};

export const getEntityPath = (): string => {
  const rootPath = getRootPath();
  return path.join(rootPath, "entity");
};

export const getMigrationPath = (): string => {
  const rootPath = getRootPath();
  return path.join(rootPath, "migrations");
};

export const getViewsPath = (): string => {
  const rootPath = getRootPath().split("src")[0];
  return path.join(rootPath, "views");
};
