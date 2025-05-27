import { Elysia, t } from "elysia";
import { Post } from "../models";

const postRoutes = new Elysia({ prefix: "/api/posts" })
  .post(
    "/",
    async ({ body, set }) => {
      try {
        const post = await Post.create(body);
        set.status = 201;
        return post;
      } catch (error: any) {
        set.status = 400;
        return { error: error.message };
      }
    },
    {
      body: t.Object({
        title: t.String(),
        content: t.String(),
        userId: t.Number(),
      }),
    },
  )
  .get("/", async ({ set }) => {
    try {
      const posts = await Post.findAll();
      return posts;
    } catch (error: any) {
      set.status = 500;
      return { error: error.message };
    }
  });

export { postRoutes };
