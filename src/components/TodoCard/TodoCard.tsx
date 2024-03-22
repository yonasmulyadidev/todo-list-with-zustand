import { Button } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';

import { useTodoStore } from '../../store/TodoStore/TodoStore';
import { todoButtonStyles, todoCardStyles } from './TodoCard.styles';
import { TodoProps } from './TodoProps';

const TodoCard: FC<TodoProps> = ({ id, title, dateCreated }) => {
  const [updatedTodoText, setUpdatedTodoText] = useState<string>(title);
  const [isContentEditable, setIsContentEditable] = useState<boolean>(false);

  const { editTodo, removeTodo } = useTodoStore();

  const handleEditButton = (): void => {
    setIsContentEditable(true);
  };

  const handleDeleteButton = (id: string): void => {
    removeTodo(id);
  };

  const handleSaveButton = (id: string, title: string): void => {
    editTodo(id, title);
    setIsContentEditable(false);
  };

  const handleUpdateTodoText = (e: ChangeEvent<HTMLInputElement>): void => {
    setUpdatedTodoText(e.currentTarget.textContent!);
  };

  return (
    <div
      className="todo-card flex justify-between px-2 my-2 h-16"
      style={todoCardStyles}>
      <div>
        <p
          onInput={handleUpdateTodoText}
          contentEditable={isContentEditable}
          className="todo-card__title font-bold mb-0 mt-3">
          {title}
        </p>
        <p className="todo-card__date mb-2 text-xs">{dateCreated}</p>
      </div>
      <div className="todo-card__action mt-3">
        {isContentEditable ? (
          <Button
            color="primary"
            style={todoButtonStyles}
            onClick={() => handleSaveButton(id, updatedTodoText)}
            variant="contained">
            Save
          </Button>
        ) : (
          <Button
            color="primary"
            style={todoButtonStyles}
            onClick={handleEditButton}
            variant="contained">
            Edit
          </Button>
        )}

        <Button
          color="error"
          onClick={() => handleDeleteButton(id)}
          style={todoButtonStyles}
          variant="contained">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TodoCard;
