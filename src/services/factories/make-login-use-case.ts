import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { LoginUseCase } from "../use-cases/user/login";

export function makeLoginUseCase() {
  const userRepository = new PrismaUserRepository();
  const loginUseCase = new LoginUseCase(userRepository);

  return loginUseCase;
}
