import "./App.css";
import Input from "./components/Input";
import AllTodos from "./components/AllTodos";

function App() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-center p-1 font-semibold text-xl md:text-3xl">
        Type Safe Todo App
      </h1>
      <Input />
      <div className="divider"></div>
      <AllTodos />
    </div>
  );
}

export default App;
