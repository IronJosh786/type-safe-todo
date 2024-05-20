import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const addTodo = async (req: Request, res: Response) => {
  try {
    const { title, task } = req.body;
    const newTodo = await prisma.todo.create({
      data: {
        title,
        task,
      },
    });
    if (!newTodo) {
      return res.status(400).json({ message: "Invalid input" });
    }
    return res.status(201).json({ message: "Todo added", todo: newTodo });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong while adding todo" });
  }
};

const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: [
        {
          completed: "asc",
        },
        {
          createdAt: "asc",
        },
      ],
    });
    return res.status(200).json({ message: "Fetched todos", todos: todos });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong fetching todos" });
  }
};

const editTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { title, task, completed } = req.body;
    const isPresent = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    if (!isPresent) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const editedTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title,
        task,
        completed,
      },
    });
    return res.status(201).json({ message: "Todo edited", todo: editedTodo });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong while editing todo" });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const isPresent = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    if (!isPresent) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const deletedTodo = await prisma.todo.delete({
      where: {
        id: id,
      },
    });
    return res.status(201).json({ message: "Todo deleted", todo: deletedTodo });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong while deleting todo" });
  }
};

export { addTodo, getTodos, editTodo, deleteTodo };
