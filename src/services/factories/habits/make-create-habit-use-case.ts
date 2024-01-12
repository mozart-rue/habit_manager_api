import { PrismaHabitRepository } from "../../../repositories/prisma/prisma-habit-repository";
import { CreateHabitUseCase } from "../../use-cases/habits/create-habit";

export function makeCreateHabitUseCase() {
  const habitRepository = new PrismaHabitRepository();
  const createHabitUseCase = new CreateHabitUseCase(habitRepository);

  return createHabitUseCase;
}
