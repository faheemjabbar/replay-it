import fs from "fs-extra";
import { log } from "./logger";

export const saveRequest = async (file: string, reqData: any) => {
  try {
    const data = (await fs.pathExists(file))
      ? await fs.readJson(file)
      : { requests: [] };

    data.requests.push(reqData);
    await fs.writeJson(file, data, { spaces: 2 });
    log.success(`Request saved to ${file}`);
  } catch (err: any) {
    log.error(`Failed to save request: ${err.message}`);
  }
};

export const loadRequests = async (file: string) => {
  if (!(await fs.pathExists(file))) {
    log.error(`No request file found at ${file}`);
    return [];
  }
  const { requests } = await fs.readJson(file);
  return requests || [];
};
