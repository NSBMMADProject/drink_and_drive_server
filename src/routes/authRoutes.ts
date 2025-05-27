import { Elysia, t } from "elysia";
import { User } from "../models";
import * as bcrypt from "bcryptjs";

const authRoutes = new Elysia({ prefix: "/api/auth" })
  .post(
    "/register",
    async ({ body, jwt, set }) => {
      try {
        const { username, email, password } = body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          set.status = 400;
          return { error: "Email already in use" };
        }

        // Create new user
        const user = await User.create({
          username,
          email,
          password,
        });

        return {
          message: "User created successfully",
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
          },
        };
      } catch (err: any) {
        console.error("Registration error:", err);
        set.status = 500;
        return { error: err.message };
      }
    },
    {
      body: t.Object({
        username: t.String(),
        email: t.String({ format: "email" }),
        password: t.String({ minLength: 6 }),
      }),
    },
  )
  .post(
    "/login",
    async ({ body, jwt, set }) => {
      try {
        const { email, password } = body;

        // Find user by email
        const user = await User.findOne({ where: { email } });

        // Check if user exists and password is correct
        if (!user || !user.validPassword(password)) {
          set.status = 401;
          return { error: "Invalid email or password" };
        }

        // Generate JWT token
        const token = await jwt.sign({
          id: user.id,
          email: user.email,
        });

        return {
          token,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
          },
        };
      } catch (err: any) {
        set.status = 500;
        return { error: err.message };
      }
    },
    {
      body: t.Object({
        email: t.String({ format: "email" }),
        password: t.String(),
      }),
    },
  );

export { authRoutes };
