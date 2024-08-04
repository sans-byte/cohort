import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import "./App.css";
import {
  todoAtom,
  todoFilterSelectorAtom,
  todoSelector,
} from "./store/atom/todo";
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
  const setFilter = useSetRecoilState(todoFilterSelectorAtom);
  const todoRef = useRef();
  const descriptionRef = useRef();
  const filterRef = useRef();
  const filterTodos = useRecoilValue(todoSelector);

  const handleFilter = () => {
    setFilter(filterRef.current.value);
    setTodos(filterTodos);
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
