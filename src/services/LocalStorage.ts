import { Todo } from '../models/Todo';

export const getTodosByKey = (key: string): Todo[] => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key)!)
    : [];
};
