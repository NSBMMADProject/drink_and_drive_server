import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { cookie } from "@elysiajs/cookie";
import { swagger } from "@elysiajs/swagger";
import { jwt } from "@elysiajs/jwt";

import { sequelize } from "./models";
import { authRoutes } from "./routes/authRoutes";
import { postRoutes } from "./routes/postRoutes";
import { userRoutes } from "./routes/userRoutes";
import { protectedRoutes } from "./routes/protectedRoutes";

const PORT = process.env.PORT || 4000;

const app = new Elysia()
  .use(
    cors({
      credentials: true,
      origin: true,
    }),
  )
  .use(cookie())
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    }),
  )
  .use(
    swagger({
      documentation: {
        info: {
          title: "Drink and Drive API",
          version: "1.0.0",
        },
      },
    }),
  )
  .get("/", () => ({
    message: "Server is running with Elysia and Bun!",
  }))
  .use(authRoutes)
  .use(userRoutes)
  .use(postRoutes)
  .use(protectedRoutes)
  .onError(({ code, error }) => {
    console.error("Error:", error);

    if (code === "VALIDATION") {
      return {
        error: "Validation failed",
        message: error.message,
      };
    }

    return {
      error: "Internal server error",
      message: error.message,
    };
  });

// Database connection and server startup
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("PostgreSQL connected via Supabase");

    // Sync models with database
    await sequelize.sync();
    console.log("Database synchronized");

    // Start server
    app.listen(PORT);
    console.log(`🦊 Elysia server is running on port ${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

// Start the server
startServer();

export default app;
