import { successResponse } from "../helperFunction/responseHandler";
import {
  CustomError,
  HandlerParam,
  asyncHandlerWrapper,
} from "../helperFunction/asyncHandeler";
/**
 * @swagger
 * /demoApi:
 *   get:
 *     description: Get an example response
 *     responses:
 *       200:
 *         description: Successful response
 */

// Export the GET handler wrapped in the async handler
export const GET = asyncHandlerWrapper(
  async ({ logger, prismaClient }: HandlerParam) => {
    logger.info("data getting");
    const users = await prismaClient.user.findMany();
    return successResponse(users);
  }
);

export const POST = asyncHandlerWrapper(
  async ({ logger, prismaClient, req }: HandlerParam) => {
    logger.info("data inserting");
    const body = await req.json();
    if (!body.name || !body.email) {
      throw new CustomError("Name and email are required", 400);
    }

    // Create a new record in the database (customize the Prisma model and fields as needed)
    const newUser = await prismaClient.user.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });
    return successResponse(newUser);
  }
);
