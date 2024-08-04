import { atom, selector } from "recoil";

export const todoAtom = atom({
  key: "todoAtom",
  default: [
    {
      key: 1,
      title: "Make lunch",
      description: "Today is your turn to make the lunch so get to it",
    },
  ],
});

export const todoFilterSelectorAtom = atom({
  key: "todoFilterSelectorAtom",
  default: "",
});

export const todoSelector = selector({
  key: "todoSelector",
  get: (props) => {
    const todos = props.get(todoAtom);
    const filter = props.get(todoFilterSelectorAtom);
    const filteredTodos = todos.filter(
      (todo) =>
        todo.title.match(new RegExp(filter, "i")) ||
        todo.description.match(new RegExp(filter, "i"))
    );
    return filteredTodos;
  },
});
