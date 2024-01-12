import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "../../../services/errors/resource-not-found-error";
import { makeRemoveHabitUseCase } from "../../../services/factories/habits/make-remove-habit";

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const removeParamSchema = z.object({
    habitId: z.string(),
  });

  const { habitId } = removeParamSchema.parse(request.params);

  try {
    const removeHabitsUseCase = makeRemoveHabitUseCase();

    await removeHabitsUseCase.execute({ userId: request.user.sub, habitId });

    return reply.status(200).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
