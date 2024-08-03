import { atom, selector } from "recoil";

export const todoAtom = atom({
  key: "todoAtom",
  default: [],
});

export const todoSelector = atom({
  key: "todoSelector",
  get: (props) => {
    const todo = props.get(todoAtom);
    return [];
  },
});
