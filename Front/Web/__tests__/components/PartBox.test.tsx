import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PartBox from '../../src/components/PartBox';

describe('PartBox', () => {
    const mockOnButtonClick = jest.fn();
    const mockOnInputChange = jest.fn();

    beforeEach(() => {
        render(
            <PartBox
                color="blue"
                title="TestTitle"
                buttonText="TestButton"
                onButtonClick={mockOnButtonClick}
                inputData=""
                onInputChange={mockOnInputChange}
            />
        );
    });

    it('renders the title and button text', () => {
        expect(screen.getByText('TestTitle')).toBeInTheDocument();
        expect(screen.getByText('TestButton')).toBeInTheDocument();
    });

    it('calls the button click handler when button is clicked', () => {
        fireEvent.click(screen.getByText('TestButton'));
        expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
    });

    it('calls the input change handler when input value changes', () => {
        fireEvent.change(screen.getByPlaceholderText('Enter testtitle data'), { target: { value: 'New Value' } });
        expect(mockOnInputChange).toHaveBeenCalledWith('New Value');
    });
});
