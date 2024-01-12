import { HabitRepository } from "../../../repositories/habit-repository";

interface FetchAllHabitsUseCaseRequest {
  userId: string;
}

interface FetchAllHabitsUseCaseResponse {
  habits: HabitHistory[];
}

export class FetchAllHabitsUseCase {
  constructor(private habitRepository: HabitRepository) {}

  async execute({
    userId,
  }: FetchAllHabitsUseCaseRequest): Promise<FetchAllHabitsUseCaseResponse> {
    const habits = await this.habitRepository.fetchAll(userId);

    return { habits };
  }
}
