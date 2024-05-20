import { useRef, useState } from "react";
import { TodoInterface } from "../types/todos";
import { useDeleteTodo, useUpdateTodo } from "../hooks/useTodos";

const SingleTodo = ({ todo }: { todo: TodoInterface }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const [title, setTitle] = useState(todo.title);
  const [task, setTask] = useState(todo.task);
  const [completed, setCompleted] = useState(todo.completed);

  const { mutate: updateTodo, isPending } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleDetailSubmit = () => {
    updateTodo({
      id: todo.id,
      data: {
        title,
        task,
      },
    });
  };

  const handleCompletionToggle = () => {
    updateTodo({
      id: todo.id,
      data: {
        completed: !completed,
      },
    });
  };

  const handleDeletion = () => {
    deleteTodo({ id: todo.id });
  };

  const modalId = `modal-${todo.id}`;

  return (
    <tr className="border-b border-[#202C34]">
      <th>
        <dialog id={modalId} className="modal modal-middle" ref={dialogRef}>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
          <div className="modal-box">
            <form
              onSubmit={handleDetailSubmit}
              method="dialog"
              className="card-body p-2 md:p-4"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="title..."
                  className="input input-bordered"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-control col-span-2">
                <label className="label">
                  <span className="label-text">Task</span>
                </label>
                <input
                  type="text"
                  placeholder="task..."
                  className="input input-bordered"
                  id="task"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Update Todo
                </button>
              </div>
            </form>
          </div>
        </dialog>
        <label>
          <input
            type="checkbox"
            className="checkbox"
            defaultChecked={completed}
            onChange={handleCompletionToggle}
            disabled={isPending}
          />
        </label>
      </th>
      <td className="w-96 text-center">{title}</td>
      <td className="w-96 text-center">{task}</td>
      <td className="flex justify-center items-center">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-sm">
            <i className="ri-more-line"></i>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li onClick={openModal}>
              <div className="flex items-center">
                <i className="ri-edit-box-line"></i> Edit
              </div>
            </li>
            <li onClick={handleDeletion}>
              <div className="flex items-center">
                <i className="ri-delete-bin-line"></i> Delete
              </div>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default SingleTodo;
