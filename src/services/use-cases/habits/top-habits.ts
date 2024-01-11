import { HabitRepository } from "../../../repositories/habit-repository";

interface TopHabitsUseCaseRequest {
  userId: string;
}

interface TopHabitsUseCaseResponse {
  habits: HabitHistory[];
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
