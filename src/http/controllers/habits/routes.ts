import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middleware/verify-jwt";
import { create } from "./create";
import { fetchAll } from "./fetch-all";

export async function habitRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/habits/create", create);
  app.get("/habits/fetchAll", fetchAll);
}
