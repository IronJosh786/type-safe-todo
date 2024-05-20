import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoInterface } from "../types/todos";

const getTodos = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/v1/todo/get-todos`
    );
    return response.data.todos;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch todos");
  }
};

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

const createTodo = async ({
  data,
}: {
  data: {
    task: string;
    title: string;
  };
}) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/todo/add-todo`,
      data
    );
  } catch (error) {
    console.log(error);
    throw new Error("Could not create todo");
  }
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

const updateTodo = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<TodoInterface>;
}) => {
  try {
    await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/todo/edit-todo/${id}`,
      data
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update todo");
  }
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

const deleteTodo = async ({ id }: { id: string }) => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/v1/todo/delete-todo/${id}`
    );
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete todo");
  }
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
