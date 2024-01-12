import { Habit } from "@prisma/client";

export interface HabitRepository {
  save(data: CreateHabit): Promise<Habit>;
  fetchAll(userId: string): Promise<HabitHistory[]>;
  fetchTopThreeDailyHabits(userId: string): Promise<HabitHistory[]>;
  findById(userId: string, habitId: string): Promise<Habit | null>;
}
