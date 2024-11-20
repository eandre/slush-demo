import { api } from "encore.dev/api";

export const hello = api(
  { expose: true, method: "GET", path: "/hello/:name" },
  (req: { name: string }): { message: string } => {
    const message = `Hello, ${req.name}!`;
    return { message };
  }
);
