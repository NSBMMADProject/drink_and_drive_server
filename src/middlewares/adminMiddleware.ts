import { Elysia } from "elysia";

const adminMiddleware = new Elysia().derive(({ user, set }: any) => {
  if (!user || user.role !== "admin") {
    set.status = 403;
    throw new Error("Access denied. Admin only.");
  }

  return { user };
});

export { adminMiddleware };
