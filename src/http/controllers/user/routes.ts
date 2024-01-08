import { FastifyInstance } from "fastify";
import { register } from "./register";
import { login } from "./login";
import { refresh } from "./refresh";

export async function userRoutes(app: FastifyInstance) {
  app.post("/user/register", register);
  app.post("/user/login", login);
  app.patch("/token/refresh", refresh);
}
