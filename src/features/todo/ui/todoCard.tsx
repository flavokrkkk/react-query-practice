import { FC } from "react";
import { ITodos } from "../../../entities/todo/types/types";

interface ITodoCard {
  todo: ITodos;
}

const TodoCard: FC<ITodoCard> = ({ todo: { title } }) => {
  return <div className="border p-2 rounded-lg">{title}</div>;
};

export default TodoCard;
