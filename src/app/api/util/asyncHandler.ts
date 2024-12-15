import { NextResponse } from "next/server";
import getLogger from "../../../../util/logger";
import type { Logger } from "pino";
import { prisma } from "./prismaClient";
import { PrismaClient } from "@prisma/client/extension";
export interface HandlerParam {
  req: Request;
  logger: Logger;
  prismaClient: PrismaClient;
}
export type AsyncHandler = (
  param: HandlerParam
) => Promise<NextResponse | void>;

export class CustomError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

export const asyncHandlerWrapper = (handler: AsyncHandler) => {
  return async (req: Request) => {
    try {
      const logger = await getLogger(); // Initialize logger
      const prismaClient = prisma; // Use the prisma client directly

      const handlerParam: HandlerParam = { req, logger, prismaClient }; // Setup handler params

      return await handler(handlerParam);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message.toLowerCase()
          : "An unexpected error occurred";
      const statusCode = error instanceof CustomError ? error.status : 500;
      return NextResponse.json(
        { data: errorMessage, message: "FAIL", status: statusCode },
        { status: statusCode }
      );
    }
  };
};
