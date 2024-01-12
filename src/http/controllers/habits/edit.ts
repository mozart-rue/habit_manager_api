import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeEditHabitUseCase } from "../../../services/factories/habits/make-edit-habit-use-case";
import { ResourceNotFoundError } from "../../../services/errors/resource-not-found-error";

export async function edit(request: FastifyRequest, reply: FastifyReply) {
  const editBodySchema = z.object({
    goal_name: z.string(),
    habit_name: z.string(),
    frequency: z.string(),
    period_end: z.coerce.date(),
  });

  const editParamSchema = z.object({
    habitId: z.string(),
  });

  const { habitId } = editParamSchema.parse(request.params);

  const { goal_name, habit_name, frequency, period_end } = editBodySchema.parse(
    request.body,
  );

  const editHabitUseCase = makeEditHabitUseCase();

  try {
    const habit = await editHabitUseCase.execute({
      userId: request.user.sub,
      habitId,
      goal_name,
      habit_name,
      frequency,
      period_end,
    });

    return reply.status(200).send({ habit });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
