import { PrismaHabitRepository } from "../../../repositories/prisma/prisma-habit-repository";
import { FetchAllHabitsUseCase } from "../../use-cases/habits/fetch-all-habits";

export function makeFetchAllHabitsUseCase() {
  const habitRepository = new PrismaHabitRepository();
  const fetchAllHabitsUseCase = new FetchAllHabitsUseCase(habitRepository);

  return fetchAllHabitsUseCase;
}
