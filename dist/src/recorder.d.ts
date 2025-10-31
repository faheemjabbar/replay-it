export declare function recordRequests({ file }?: {
    file?: string;
}): (req: any, res: any, next: any) => Promise<void>;
