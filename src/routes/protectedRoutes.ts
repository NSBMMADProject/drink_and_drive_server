import { Elysia } from "elysia";
import { authMiddleware } from "../middlewares/authMiddleware";

const protectedRoutes = new Elysia({ prefix: "/api/protected" })
  .use(authMiddleware)
  .get("/", ({ user }) => {
    return {
      message: "You accessed protected route",
      user,
    };
  });

export { protectedRoutes };
