import { Historic } from "@prisma/client";

export {};

declare global {
  type HabitHistory = {
    id: string;
    goal_name: string;
    habit_name: string;
    user_id: string;
    done: boolean;
    frequency: string;
    period_start: Date;
    period_end: Date;
    created_at: Date;
    historic: Historic[];
  };
}
