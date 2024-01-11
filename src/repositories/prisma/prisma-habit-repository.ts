import { HabitRepository } from "../habit-repository";
import { prisma } from "../../lib/prisma";

export class PrismaHabitRepository implements HabitRepository {
  async fetchTopThreeDailyHabits(userId: string) {
    const habits = await prisma.habit.findMany({
      where: {
        user_id: userId,
        period_end: {
          gte: new Date(),
        },
      },
      take: 3,
    });

    return habits;
  }
}
