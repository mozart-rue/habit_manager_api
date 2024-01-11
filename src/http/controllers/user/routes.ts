import { FastifyInstance } from "fastify";
import { register } from "./register";
import { login } from "./login";
import { refresh } from "./refresh";
import { verifyJWT } from "../../middleware/verify-jwt";
import { topHabitsAndGoals } from "./top-habits-and-goals";

export async function userRoutes(app: FastifyInstance) {
  app.post("/user/register", register);
  app.post("/user/login", login);
  app.patch("/token/refresh", refresh);

  // Authenticate Routes
  app.get(
    "/user/top_habits_and_goals",
    { onRequest: [verifyJWT] },
    topHabitsAndGoals,
  );
}
