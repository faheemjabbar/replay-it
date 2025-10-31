import axios from "axios";
import { loadRequests } from "./storage";
import { log } from "./logger";

export async function replayRequests(file: string, baseUrl: string) {
  const requests = await loadRequests(file);
  if (!requests.length) {
    log.warn("No requests to replay.");
    return;
  }

  log.info(`🔁 Replaying ${requests.length} requests to ${baseUrl}`);

  let success = 0;
  const results = [];

  for (const req of requests) {
    try {
      const response = await axios({
        method: req.method,
        url: `${baseUrl}${req.url}`,
        headers: { ...req.headers, host: undefined }, // Remove original host
        data: req.body,
        timeout: 5000,
        validateStatus: () => true, // Accept any status
      });

      log.success(`${req.method} ${req.url} → ${response.status}`);
      success++;
      results.push({ request: req, status: response.status, success: true });
    } catch (err: any) {
      log.error(`${req.method} ${req.url} → ${err.message}`);
      results.push({ request: req, error: err.message, success: false });
    }
  }

  log.info(`✨ Replay complete! ${success}/${requests.length} succeeded.`);
  return results;
}
