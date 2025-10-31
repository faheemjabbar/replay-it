import { saveRequest } from "./storage.js";
import { log } from "./logger.js";
import { redactHeaders, redactBody } from "./redactor.js";

export function recordRequests({ file = "requests.json" } = {}) {
  return async (req: any, res: any, next: any) => {
    const bodyChunks: Buffer[] = [];

    // Capture body data
    req.on("data", (chunk: Buffer) => bodyChunks.push(chunk));

    // Save when request completes
    req.on("end", async () => {
      const body = Buffer.concat(bodyChunks).toString() || "";

      const reqData = {
        method: req.method,
        url: req.originalUrl || req.url,
        headers: redactHeaders(req.headers),
        body: body ? redactBody(body) : "",
        timestamp: new Date().toISOString(),
      };

      await saveRequest(file, reqData);
    });

    next(); // Continue immediately
  };
}