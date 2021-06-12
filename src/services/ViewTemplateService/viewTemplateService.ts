import { getViewsPath } from "../../utils/pathUtils";
import * as fs from "fs";
import path from "path";
import { replacer } from "../../utils/stringUtils";

interface ViewTemplateService {
  getEmailTemplate: (string, data?: Record<string, unknown>) => Promise<string | NodeJS.ErrnoException>;
}

const ViewTemplateService = (): ViewTemplateService => {
  const viewPath = getViewsPath();

  const getEmailTemplate = (
    name: string,
    data?: Record<string, string | number>,
  ): Promise<string | NodeJS.ErrnoException> => {
    return new Promise((resolve, reject) => {
      const emailPath = path.join(viewPath, "email", `${name}.html`);

      fs.readFile(emailPath, (error: NodeJS.ErrnoException | null, buffer: Buffer) => {
        if (error) {
          return reject(error);
        }

        let template = buffer.toString();

        if (data) {
          template = replacer(buffer.toString(), data);
        }

        return resolve(template);
      });
    });
  };

  return {
    getEmailTemplate,
  };
};

export default ViewTemplateService;
