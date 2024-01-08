import { User } from ".prisma/client";
import { UserRepository } from "../../../repositories/user-repository";
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error";
import { compare } from "bcryptjs";

interface LoginUseCaseRequest {
  email: string;
  password: string;
}

interface LoginUseCaseResponse {
  user: User;
}

export class LoginUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(password, user.password_hash);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
