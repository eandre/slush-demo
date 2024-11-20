import { api } from "encore.dev/api";
import { Topic } from "encore.dev/pubsub";
import { SQLDatabase } from "encore.dev/storage/sqldb";

interface Todo {
  id: number;
  done: boolean;
  title: string;
}

export const create = api(
  { expose: true, method: "POST", path: "/todos" },
  async (req: { title: string }): Promise<Todo> => {
    const resp = await db.queryRow`
      INSERT INTO todos (title)
      VALUES (${req.title})
      RETURNING *;
      `;

    await topic.publish(resp as Todo);
    return resp as Todo;
  }
);



// Create the todo database and assign it to the "db" variable
const db = new SQLDatabase("todos", {
  migrations: "./migrations",
});

const topic = new Topic<Todo>("todo.added", {
  deliveryGuarantee: "at-least-once",
});
