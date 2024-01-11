import { Habit } from "@prisma/client";
import { HabitRepository } from "../../../repositories/habit-repository";

interface TopHabitsUseCaseRequest {
  userId: string;
}

interface TopHabitsUseCaseResponse {
  habits: Habit[];
}

export class TopHabitsUseCase {
  constructor(private habitsRepository: HabitRepository) {}

  async execute({
    userId,
  }: TopHabitsUseCaseRequest): Promise<TopHabitsUseCaseResponse> {
    const habits = await this.habitsRepository.fetchTopThreeDailyHabits(userId);

    return { habits };
  }
}
