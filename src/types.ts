export interface RecordedRequest {
  method: string;
  url: string;
  headers: Record<string, string | string[]>;
  body: string;
  timestamp: string;
}

export interface RequestsFile {
  requests: RecordedRequest[];
}

export interface RecorderOptions {
  file?: string;
  redact?: boolean;
}