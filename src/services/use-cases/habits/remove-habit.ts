import { HabitRepository } from "../../../repositories/habit-repository";
import { ResourceNotFoundError } from "../../errors/resource-not-found-error";

interface RemoveHabitUseCaseRequest {
  userId: string;
  habitId: string;
}

export class RemoveHabitUseCase {
  constructor(private habitRepository: HabitRepository) {}

  async execute({ userId, habitId }: RemoveHabitUseCaseRequest) {
    const hasHabit = await this.habitRepository.findById(userId, habitId);

    if (!hasHabit) {
      throw new ResourceNotFoundError();
    }

    await this.habitRepository.remove(userId, habitId);
  }
}
