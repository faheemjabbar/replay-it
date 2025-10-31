import { saveRequest } from "./storage.js";
import { redactHeaders, redactBody } from "./redactor.js";
export function recordRequests({ file = "requests.json" } = {}) {
    return async (req, res, next) => {
        const bodyChunks = [];
        // Capture body data
        req.on("data", (chunk) => bodyChunks.push(chunk));
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
