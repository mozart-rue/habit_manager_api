import { PrismaHabitRepository } from "../../../repositories/prisma/prisma-habit-repository";
import { TopHabitsUseCase } from "../../use-cases/habits/top-habits";

export function makeTopHabitsUseCase() {
  const habitsRepository = new PrismaHabitRepository();
  const topHabitsUseCase = new TopHabitsUseCase(habitsRepository);

  return topHabitsUseCase;
}
