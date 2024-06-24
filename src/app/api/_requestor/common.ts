import Logger from "@/utils/logger";

export const reqLogger = new Logger('BACK_REQ');
export const resLogger = new Logger('BACK_RES');
export const baseURL = process.env.NEXT_PUBLIC_BACKEND as string;