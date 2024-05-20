import SingleTodo from "./SingleTodo";
import { useTodos } from "../hooks/useTodos";
import { TodoInterface } from "../types/todos";
import Loader from "./Loader";

const AllTodos = () => {
  const { data: todos, error, isLoading } = useTodos();

  const typedTodos = todos as TodoInterface[];

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="">
      <table className="table-lg mx-auto">
        <thead className="border-b border-[#202C34]">
          <tr>
            <th>Status</th>
            <th>Title</th>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader />
          ) : (
            typedTodos.map((todo) => <SingleTodo key={todo.id} todo={todo} />)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllTodos;
