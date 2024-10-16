export type PendingRequest = (error: Error | null) => Promise<void>;
export const pendingRequests: Map<string, PendingRequest[]> = new Map<string, PendingRequest[]>();
export const addToPendingRequest = (userId: string, request: PendingRequest) => {
    const queue = pendingRequests.get(userId);
    if (queue === undefined) {
        pendingRequests.set(userId, [request]);
    } else {
        queue.push(request);
    }
}
export const deleteFromPendingRequest = (userId: string) => {
    pendingRequests.delete(userId);
}
export const processPendingRequest = (userId: string, error: Error | null) => {
    const queue = pendingRequests.get(userId);
    if (queue) {
        queue.forEach((callback) => callback(error));
        deleteFromPendingRequest(userId);
    }
}