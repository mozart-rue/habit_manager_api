import { PrismaHabitRepository } from "../../../repositories/prisma/prisma-habit-repository";
import { EditHabitUseCase } from "../../use-cases/habits/edit-habit";

export function makeEditHabitUseCase() {
  const habitRepository = new PrismaHabitRepository();
  const editHabitUseCase = new EditHabitUseCase(habitRepository);

  return editHabitUseCase;
}
