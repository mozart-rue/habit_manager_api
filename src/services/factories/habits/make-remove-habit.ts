import { PrismaHabitRepository } from "../../../repositories/prisma/prisma-habit-repository";
import { RemoveHabitUseCase } from "../../use-cases/habits/remove-habit";

export function makeRemoveHabitUseCase() {
  const habitRepository = new PrismaHabitRepository();
  const removeHabitUseCase = new RemoveHabitUseCase(habitRepository);

  return removeHabitUseCase;
}
