import { HandlerParam, asyncHandlerWrapper } from "../util/asyncHandler";
import { successResponse } from "../util/responseHandler";
import { Demo } from "./demo";

const demoInstance = new Demo("rok", 23);
// Export the GET handler wrapped in the async handler
export const GET = asyncHandlerWrapper(async (handlerParam: HandlerParam) => {
  const { logger } = handlerParam;
  logger.info(demoInstance.introduce());
  const users = await demoInstance.getData(handlerParam);
  if (users) {
    return successResponse(users);
  } else {
    throw new Error("no data");
  }
});
