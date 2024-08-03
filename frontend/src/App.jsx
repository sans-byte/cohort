import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import "./App.css";
import { todoAtom, todoSelector } from "./store/atom/todo";
import React, { useRef } from "react";

function App() {
  return (
    <div>
      <RecoilRoot>
        <TodoList />
      </RecoilRoot>
    </div>
  );
}

function TodoList() {
  const [todos, setTodos] = useRecoilState(todoAtom);
  const todoRef = useRef();
  const descriptionRef = useRef();
  const filterRef = useRef();

  console.log(todos);

  const handleFilter = () => {
    const filteredTodos = todos.filter(
      (todo) =>
        todo.title.match(new RegExp(filterRef.current.value, "i")) ||
        todo.description.match(new RegExp(filterRef.current.value, "i"))
    );
    console.log(filterRef.current.value);
    console.log(filteredTodos);
    setTodos(filteredTodos);
  };

  const handleSubmit = () => {
    const key = todos.length + 1;
    setTodos([
      ...todos,
      {
        key,
        title: todoRef.current.value,
        description: descriptionRef.current.value,
      },
    ]);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <input
          type="text"
          name="todo"
          id="todo"
          ref={todoRef}
          placeholder="Letss complete it"
        />
        <input
          type="text"
          name="description"
          id="description"
          ref={descriptionRef}
          placeholder="Add description"
        />
        <button onClick={handleSubmit}> Add todo</button>
      </div>
      <div>
        <input
          type="text"
          name="filter"
          id="filter"
          ref={filterRef}
          placeholder="Add filter"
        />
        <button onClick={handleFilter}> Filter todos</button>
      </div>
      {todos.map((todo, index) => (
        <Todos todo={todo} key={index} />
      ))}
    </div>
  );
}

const Todos = React.memo(function Todos({ todo }) {
  return (
    <div>
      <h3>
        <span>{todo.key}. </span>
        {todo.title}
      </h3>
      <p>{todo.description}</p>
    </div>
  );
});

export default App;
