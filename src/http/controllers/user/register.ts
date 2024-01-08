import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterUserUseCase } from "../../../services/factories/make-register-user-use-case";
import { UserAlreadyExistsError } from "../../../services/errors/user-already-exists-error";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  const registerUserUseCase = makeRegisterUserUseCase();

  try {
    await registerUserUseCase.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
