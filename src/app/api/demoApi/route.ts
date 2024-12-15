import { successResponse } from "../util/responseHandler";
import {
  CustomError,
  HandlerParam,
  asyncHandlerWrapper,
} from "../util/asyncHandler";
/**
 * @swagger
 * /demoApi:
 *   get:
 *     summary: Retrieve all users
 *     description: Fetch all users from the database.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The user's name.
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     description: The user's email address.
 *                     example: johndoe@example.com
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the user was created.
 *                     example: "2024-01-01T00:00:00.000Z"
 *   post:
 *     summary: Create a new user
 *     description: Add a new user to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The user's name.
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: The user's email address.
 *                   example: johndoe@example.com
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the user was created.
 *                   example: "2024-01-01T00:00:00.000Z"
 *       400:
 *         description: Bad Request. Missing required fields (name or email).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: Name and email are required
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
