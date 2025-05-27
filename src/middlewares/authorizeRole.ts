import { Elysia } from "elysia";

const authorizeRole = (roles: string[]) => {
  return new Elysia().derive(({ user, set }: any) => {
    if (!user || !roles.includes(user.role)) {
      set.status = 403;
      throw new Error("Access forbidden: insufficient rights");
    }

    return { user };
  });
};

export { authorizeRole };
