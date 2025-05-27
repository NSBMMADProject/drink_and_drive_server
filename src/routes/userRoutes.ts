import { Elysia, t } from "elysia";
import { User } from "../models";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authorizeRole } from "../middlewares/authorizeRole";

const userRoutes = new Elysia({ prefix: "/api/users" })
  .post(
    "/",
    async ({ body, set }) => {
      try {
        const user = await User.create(body);
        set.status = 201;
        return user;
      } catch (error: any) {
        set.status = 400;
        return { error: error.message };
      }
    },
    {
      body: t.Object({
        username: t.String(),
        email: t.String({ format: "email" }),
        password: t.String({ minLength: 6 }),
        role: t.Optional(t.String()),
      }),
    },
  )
  .get("/", async ({ set }) => {
    try {
      const users = await User.findAll({ include: "posts" });
      return users;
    } catch (error: any) {
      set.status = 500;
      return { error: error.message };
    }
  })
  .use(authMiddleware)
  .get("/protected", ({ user }) => {
    return {
      message: "You accessed a protected route",
      user,
    };
  });

export { userRoutes };
