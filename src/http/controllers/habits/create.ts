import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateHabitUseCase } from "../../../services/factories/habits/make-create-habit-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    goal_name: z.string(),
    habit_name: z.string(),
    frequency: z.string(),
    periodStart: z.coerce.date(),
    periodEnd: z.coerce.date(),
  });

  const { goal_name, habit_name, frequency, periodStart, periodEnd } =
    createBodySchema.parse(request.body);

  const createHabitUseCase = makeCreateHabitUseCase();

  const habit = await createHabitUseCase.execute({
    userId: request.user.sub,
    goalName: goal_name,
    habitName: habit_name,
    frequency,
    periodStart,
    periodEnd,
  });

  return reply.status(201).send({ habit });
}
