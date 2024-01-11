export interface HabitRepository {
  fetchTopThreeDailyHabits(userId: string): Promise<HabitHistory[]>;
}
