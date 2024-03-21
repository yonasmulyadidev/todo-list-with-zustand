import mockLocalStorage from '../mocks/LocalStorageMock';
import { Todo } from '../models/Todo';
import { getTodosByKey } from './LocalStorage';

describe('getTodosByKey function', () => {
  const mockKey = 'TEST_TODO';

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
    });
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it('should return todos if exist in local storage', () => {
    // Arrange
    const mockTodoItem: Todo[] = [
      {
        id: 'abcde',
        title: 'title',
        dateCreated: '20-03-2024',
        dateModified: '20-03-2024',
      },
    ];
    localStorage.setItem(mockKey, JSON.stringify(mockTodoItem));

    // Act
    const result: Todo[] = getTodosByKey(mockKey);

    // Assert
    expect(result.length).toEqual(1);
  });

  it('should return empty array if todos array do not exist by key', () => {
    // Act
    const result: Todo[] = getTodosByKey(mockKey);

    // Assert
    expect(result.length).toEqual(0);
  });
});
