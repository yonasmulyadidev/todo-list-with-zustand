import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { TODO_STORAGE_KEY } from '../../constants/StorageConstants';
import { Todo } from '../../models/Todo';
import { getTodosByKey } from '../../services/LocalStorage';
import { TodoState } from './TodoState';

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: getTodosByKey(TODO_STORAGE_KEY) || [],

      addTodo: (title: string): void => {
        const newTodo: Todo = {
          id: uuidv4(),
          title,
          dateCreated: new Date().toISOString(),
          dateModified: new Date().toISOString(),
        };

        set((state) => {
          return {
            todos: state.todos.concat(newTodo),
          };
        });
      },

      removeTodo: (id: string): void => {
        set((state) => {
          return {
            todos: state.todos.filter((todo) => todo.id !== id),
          };
        });
      },

      editTodo: (id: string, title: string): void => {
        set((state) => {
          const todoToChange: Todo = state.todos.find((todo) => todo.id == id)!;

          const updatedTodo: Todo = {
            id: todoToChange.id,
            title: title,
            dateCreated: todoToChange.dateCreated,
            dateModified: todoToChange.dateModified,
          };

          const updateTodos: Todo[] = state.todos;
          const indexToUpdate: number = state.todos.findIndex(
            (todo) => todo.id == id
          );

          updateTodos[indexToUpdate] = updatedTodo;

          return {
            todos: updateTodos,
          };
        });
      },
    }),
    {
      name: TODO_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
