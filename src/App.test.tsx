import { render, screen } from '@testing-library/react';

import App from './App';

describe('App component', () => {
  it('should render correctly', () => {
    // Act
    render(<App />);

    // Assert
    expect(screen.getByText('My Todo List')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter your todo...')).toBeTruthy();
    expect(screen.getByText('Add Todo')).toBeTruthy();
  });
});
