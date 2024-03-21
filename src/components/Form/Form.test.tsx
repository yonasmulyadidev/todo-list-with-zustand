import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./Form";

describe('Form component', () => {
    beforeEach(() => {
        // Before each act
        render(<Form/>);
    });

    it('should render form component correctly', () => {
        // Assert
        expect(screen.getByText('Todo List')).toBeTruthy();
        expect(screen.getByPlaceholderText('Enter your todo...')).toBeTruthy();
        expect(screen.getByText('Add Todo')).toBeTruthy();
    });

    it('should fill up form on input', () => {
        // Arrange
        const expectedInputValue = 'new todo';
        const todoInput: HTMLInputElement = screen.getByPlaceholderText('Enter your todo...');
        
        // Act
        fireEvent.change(todoInput, {target: {value: expectedInputValue}});

        // Assert
        expect(todoInput.value).toBe(expectedInputValue);
    });

    it('should add todo when add button is clicked', () => {
        // Arrange
        const expectedInputValue = 'todo 1';
        const todoInput: HTMLInputElement = screen.getByPlaceholderText('Enter your todo...');
        const addTodoButton = screen.getByText('Add Todo');

        // Act: add todo
        fireEvent.change(todoInput, {target: {value: expectedInputValue}});
        fireEvent.click(addTodoButton);

        // Get delete button
        const editTodoButton = screen.getByText('Edit');
        const deleteTodoButton = screen.getByText('Delete');

        // Assert
        expect(screen.getByText(expectedInputValue)).toBeTruthy();
        expect(editTodoButton).toBeTruthy();
        expect(deleteTodoButton).toBeTruthy();

        // Cleanup
        fireEvent.click(deleteTodoButton);
    });

    it('should delete todo when delete button is clicked', () => {
        // Arrange
        const expectedInputValue = 'todo 1';
        const todoInput: HTMLInputElement = screen.getByPlaceholderText('Enter your todo...');
        const addTodoButton = screen.getByText('Add Todo');

        // Act: add todo
        fireEvent.change(todoInput, {target: {value: expectedInputValue}});
        fireEvent.click(addTodoButton);
        
        // Act: delete todo
        const deleteTodoButton = screen.getByText('Delete')
        fireEvent.click(deleteTodoButton);

        // Assert
        expect(screen.queryByText(expectedInputValue)).toBeNull();
    });

    it('should save todo when save button is clicked', () => {
        // Arrange
        const expectedInputValue = 'todo 1';
        const todoInput: HTMLInputElement = screen.getByPlaceholderText('Enter your todo...');
        const addTodoButton = screen.getByText('Add Todo');

        // Act: add todo
        fireEvent.change(todoInput, {target: {value: expectedInputValue}});
        fireEvent.click(addTodoButton);
        
        // Act: edit todo
        const editTodoButton = screen.getByText('Edit')
        fireEvent.click(editTodoButton);

        // Act: save todo
        const saveTodoButton = screen.getByText('Save')
        fireEvent.click(saveTodoButton);

        // Assert
        expect(screen.getByText(expectedInputValue)).toBeTruthy();
    });
})