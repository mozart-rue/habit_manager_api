import { Habit } from "@prisma/client";

export interface HabitRepository {
  save(data: CreateHabit): Promise<Habit>;
  fetchTopThreeDailyHabits(userId: string): Promise<HabitHistory[]>;
}
