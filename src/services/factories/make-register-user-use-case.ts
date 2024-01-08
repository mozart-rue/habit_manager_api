import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { RegisterUserUseCase } from "../use-cases/user/register-user";

export function makeRegisterUserUseCase() {
  const userRepository = new PrismaUserRepository();
  const registerUserUseCase = new RegisterUserUseCase(userRepository);

  return registerUserUseCase;
}
