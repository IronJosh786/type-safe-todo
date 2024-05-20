import { useState } from "react";
import { useCreateTodo } from "../hooks/useTodos";

const Input = () => {
  const [task, setTask] = useState("");
  const [title, setTitle] = useState("");

  const { mutate: addTodo } = useCreateTodo();

  const handleSubmit = () => {
    if (!task.trim().length || !title.trim().length) {
      return;
    }
    addTodo({
      data: {
        task,
        title,
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-[300px] sm:w-[450px]"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-semibold text-lg">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="title..."
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="task" className="font-semibold text-lg">
            Task
          </label>
          <textarea
            id="task"
            placeholder="task..."
            className="textarea textarea-bordered textarea-md w-full"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default Input;
