import { Todo } from '../../models/Todo';

export interface TodoState {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: string) => void;
  editTodo: (id: string, title: string) => void;
}
