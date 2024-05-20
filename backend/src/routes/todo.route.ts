import { Router } from "express";
import {
  addTodo,
  getTodos,
  editTodo,
  deleteTodo,
} from "../controllers/todo.controller";

const todoRouter = Router();

todoRouter.route("/add-todo").post(addTodo);
todoRouter.route("/get-todos").get(getTodos);
todoRouter.route("/edit-todo/:id").patch(editTodo);
todoRouter.route("/delete-todo/:id").delete(deleteTodo);

export { todoRouter };
