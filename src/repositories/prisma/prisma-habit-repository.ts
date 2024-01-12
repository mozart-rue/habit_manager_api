import { HabitRepository, UpdateHabit } from "../habit-repository";
import { prisma } from "../../lib/prisma";

export class PrismaHabitRepository implements HabitRepository {
  async save(data: CreateHabit) {
    const habit = await prisma.habit.create({
      data: {
        goal_name: data.goal_name,
        habit_name: data.habit_name,
        frequency: data.frequency,
        period_start: data.period_start,
        period_end: data.period_end,
        user_id: data.user_id,
      },
    });

    return habit;
  }

  async findById(userId: string, habitId: string) {
    const habit = await prisma.habit.findFirst({
      where: {
        user_id: userId,
        id: habitId,
      },
    });

    return habit;
  }

  async remove(userId: string, habitId: string) {
    await prisma.habit.delete({
      where: {
        id: habitId,
        user_id: userId,
      },
    });
  }

  async edit({
    userId,
    habitId,
    goal_name,
    habit_name,
    frequency,
    period_end,
  }: UpdateHabit) {
    const habit = await prisma.habit.update({
      where: {
        id: habitId,
      },
      data: {
        goal_name,
        habit_name,
        frequency,
        period_end,
      },
    });

    return habit;
  }

  async fetchAll(userId: string) {
    const habits = prisma.habit.findMany({
      where: {
        user_id: userId,
      },
      include: {
        historic: true,
      },
    });

    return habits;
  }

  async fetchTopThreeDailyHabits(userId: string) {
    const habits = await prisma.habit.findMany({
      where: {
        user_id: userId,
        period_end: { gte: new Date() },
      },
      include: {
        historic: true,
      },
      take: 3,
    });

    return habits;
  }
}
