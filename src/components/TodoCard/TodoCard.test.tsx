import { fireEvent, render, screen } from "@testing-library/react";
import TodoCard from "./TodoCard"
import { TodoProps } from "./TodoProps";

const mockProps: TodoProps = {
    id: 'test1',
    title: 'title',
    dateCreated: '20-03-2024',
};

describe('Todo component', () => {
    beforeEach(() => {
        // Before each act
        render(<TodoCard {...mockProps}/>);
    });

    it('should render todo card correctly', () => {
        // Assert
        expect(screen.getByText(mockProps.title)).toBeTruthy();
        expect(screen.getByText(mockProps.dateCreated)).toBeTruthy();
        expect(screen.getByText("Edit")).toBeTruthy();  
        expect(screen.getByText("Delete")).toBeTruthy();
    });

    it('should render save button when the edit button is clicked', () => {
        // Arrange
        const editButton = screen.getByText('Edit');

        // Act
        fireEvent.click(editButton);

        // Assert
        expect(screen.getByText('Save')).toBeTruthy();
    });
})