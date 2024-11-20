import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import { todo } from "~encore/clients";

export const hello = api(
  { expose: true, method: "GET", path: "/hello/:name" },
  async (req: { name: string }): Promise<{ message: string }> => {
    const message = `Hello, ${req.name}!`;

    await todo.create({ title: message });
    return { message };
  }
);
