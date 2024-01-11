import { FastifyReply, FastifyRequest } from "fastify";
import { makeTopHabitsUseCase } from "../../../services/factories/habits/make-top-habits-use-case";

export async function topHabitsAndGoals(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const topHabitsUseCase = makeTopHabitsUseCase();

  const habits = await topHabitsUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    habits,
  });
}
