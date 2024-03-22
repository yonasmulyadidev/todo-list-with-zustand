import { Button, TextField } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';

import { useTodoStore } from '../../store/TodoStore/TodoStore';
import TodoCard from '../TodoCard/TodoCard';
import { formStyle } from './Form.styles';

const Form: FC = () => {
  const [todoText, setTodoText] = useState<string>('');
  const { todos, addTodo } = useTodoStore();

  const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTodoText(e.target.value);
  };

  const saveTodo = (todoText: string): void => {
    addTodo(todoText);
    cleanUpForm();
  };

  const cleanUpForm = (): void => {
    setTodoText('');
  };

  return (
    <div className="todo-form" style={formStyle}>
      <h1 className="todo-form__header font-bold text-4xl mb-5 text-center">
        My Todo List
      </h1>
      <div className="todo-form__input flex">
        <TextField
          className="w-11/12"
          id="outlined-basic"
          variant="outlined"
          placeholder="Enter your todo..."
          value={todoText}
          InputLabelProps={{
            shrink: false,
          }}
          onChange={onTextFieldChange}
        />
        <Button
          className="h-14 w-32 !ml-3"
          color="success"
          variant="contained"
          onClick={() => {
            saveTodo(todoText);
          }}>
          Add Todo
        </Button>
      </div>
      <div>
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            id={todo.id}
            title={todo.title}
            dateCreated={todo.dateCreated}
          />
        ))}
      </div>
    </div>
  );
};

export default Form;
