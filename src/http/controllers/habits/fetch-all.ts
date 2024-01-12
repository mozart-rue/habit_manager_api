import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllHabitsUseCase } from "../../../services/factories/habits/make-fetch-all-habits-use-case";

export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub;

  const fetchAllHabitsUseCase = makeFetchAllHabitsUseCase();

  const habits = await fetchAllHabitsUseCase.execute({ userId });

  return reply.status(200).send(habits);
}
