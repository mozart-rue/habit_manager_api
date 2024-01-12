import { Habit } from "@prisma/client";
import { HabitRepository } from "../../../repositories/habit-repository";
import { ResourceNotFoundError } from "../../errors/resource-not-found-error";

interface EditHabitUseCaseRequest {
  userId: string;
  habitId: string;
  goal_name: string;
  habit_name: string;
  frequency: string;
  period_end: Date;
}

interface EditHabitUseCaseResponse {
  habit: Habit;
}

export class EditHabitUseCase {
  constructor(private habitRepository: HabitRepository) {}

  async execute({
    userId,
    habitId,
    goal_name,
    habit_name,
    frequency,
    period_end,
  }: EditHabitUseCaseRequest): Promise<EditHabitUseCaseResponse> {
    const habitExists = await this.habitRepository.findById(userId, habitId);

    if (!habitExists) {
      throw new ResourceNotFoundError();
    }

    const habit = await this.habitRepository.edit({
      userId,
      habitId,
      goal_name,
      habit_name,
      frequency,
      period_end,
    });

    return { habit };
  }
}
