import { HabitRepository } from "../../../repositories/habit-repository";

interface CreateHabitUseCaseRequest {
  userId: string;
  goalName: string;
  habitName: string;
  frequency: string;
  periodStart: Date;
  periodEnd: Date;
}

export class CreateHabitUseCase {
  constructor(private habitRepository: HabitRepository) {}

  async execute({
    userId,
    goalName,
    habitName,
    frequency,
    periodStart,
    periodEnd,
  }: CreateHabitUseCaseRequest) {
    const habit = await this.habitRepository.save({
      user_id: userId,
      goal_name: goalName,
      habit_name: habitName,
      frequency,
      period_start: periodStart,
      period_end: periodEnd,
    });

    return habit;
  }
}
