import { User } from ".prisma/client";
import { UserRepository } from "../../../repositories/user-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../../errors/user-already-exists-error";

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserUseCaseResponse {
  user: User;
}

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
