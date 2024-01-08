import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeLoginUseCase } from "../../../services/factories/make-login-use-case";
import { InvalidCredentialsError } from "../../../services/errors/invalid-credentials-error";

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const loginBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const { email, password } = loginBodySchema.parse(request.body);

  const loginUseCase = makeLoginUseCase();

  try {
    const { user } = await loginUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      },
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
