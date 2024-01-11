import { Habit } from "@prisma/client";

export interface HabitRepository {
  fetchTopThreeDailyHabits(userId: string): Promise<Habit[]>;
}
