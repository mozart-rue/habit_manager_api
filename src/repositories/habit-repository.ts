import { Habit } from "@prisma/client";

export interface UpdateHabit {
  userId: string;
  habitId: string;
  goal_name: string;
  habit_name: string;
  frequency: string;
  period_end: Date;
}

export interface HabitRepository {
  save(data: CreateHabit): Promise<Habit>;
  remove(userId: string, habitId: string): Promise<void>;
  fetchAll(userId: string): Promise<HabitHistory[]>;
  fetchTopThreeDailyHabits(userId: string): Promise<HabitHistory[]>;
  findById(userId: string, habitId: string): Promise<Habit | null>;
  edit({
    userId,
    habitId,
    goal_name,
    habit_name,
    frequency,
    period_end,
  }: UpdateHabit): Promise<Habit>;
}
