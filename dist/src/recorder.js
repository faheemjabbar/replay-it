import { saveRequest } from "./storage";
import { log } from "./logger";
import { redactHeaders, redactBody } from "./redactor.js";
export function recordRequests({ file = "requests.json" } = {}) {
    return async (req, res, next) => {
        const bodyChunks = [];
        req.on("data", (chunk) => bodyChunks.push(chunk));
        req.on("end", async () => {
            const body = Buffer.concat(bodyChunks).toString() || "No body data";
            const reqData = {
                method: req.method,
                url: req.originalUrl,
                headers: redactHeaders(req.headers),
                body: redactBody(body),
                timestamp: new Date().toISOString(),
            };
            await saveRequest(file, reqData);
            log.info(`📥 Recorded ${req.method} ${req.originalUrl}`);
        });
        next(); // Continue request
    };
}
