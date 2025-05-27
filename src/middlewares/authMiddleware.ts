import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";

const authMiddleware = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    }),
  )
  .derive(async ({ headers, jwt, set }) => {
    const authorization = headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      set.status = 401;
      throw new Error("Access denied - No token provided");
    }

    const token = authorization.split(" ")[1];

    try {
      const payload = await jwt.verify(token);

      if (!payload) {
        set.status = 401;
        throw new Error("Invalid token");
      }

      return {
        user: payload,
      };
    } catch (err) {
      set.status = 401;
      throw new Error("Invalid token");
    }
  });

export { authMiddleware };
