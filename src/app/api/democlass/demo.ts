import { HandlerParam, asyncHandlerWrapper } from "../util/asyncHandler";

export class Demo {
  // Properties
  public name: string;
  public age: number;

  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Method
  public introduce(): string {
    return `Hi, my name is ${this.name} and I am ${this.age} years old.`;
  }

  public async getData(handlerParam: HandlerParam) {
    const { logger, prismaClient } = handlerParam;

    logger.info("Fetching users from database");

    // Use prisma client to fetch data
    const users = await prismaClient.user.findMany();
    return users;
  }
}
