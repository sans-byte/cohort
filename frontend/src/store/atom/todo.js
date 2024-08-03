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

export const todoSelector = selector({
  key: "todoSelector",
  get: (props) => {
    const todo = props.get(todoAtom);
    return [];
  },
});
