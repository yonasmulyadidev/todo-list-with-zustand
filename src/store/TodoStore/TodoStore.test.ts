import { act, renderHook } from '@testing-library/react-hooks';

import { TodoState } from './TodoState';
import { useTodoStore } from './TodoStore';

describe('useTodoStore', () => {
  beforeEach(() => {
    // Reset store state
    const oldState: TodoState = useTodoStore.getState();
    oldState.todos = [];

    useTodoStore.setState(oldState, true);
  });

  it('should successfully add a todo', () => {
    // Arrange
    const expectedTitle: string = 'Test Todo';
    const { result } = renderHook(() => useTodoStore());

    // Act
    act(() => {
      result.current.addTodo(expectedTitle);
    });

    // Assert
    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].title).toBe(expectedTitle);
  });

  it('should successfully remove a todo', () => {
    // Arrange
    const { result } = renderHook(() => useTodoStore());

    // Act: add todo
    act(() => {
      result.current.addTodo('Test Todo');
    });

    // Act: remove todo
    act(() => {
      result.current.removeTodo(result.current.todos[0].id);
    });

    // Assert
    expect(result.current.todos.length).toBe(0);
  });

  it('should successfully edit a todo', () => {
    // Arrange
    const expectedTextAfterUpdate = 'Edited Todo';
    const { result } = renderHook(() => useTodoStore());

    // Act: add todo
    act(() => {
      result.current.addTodo('Test Todo');
    });

    // Act: edit the added toto
    act(() => {
      result.current.editTodo(
        result.current.todos[0].id,
        expectedTextAfterUpdate
      );
    });

    // Assert
    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].title).toBe(expectedTextAfterUpdate);
  });
});
