import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../src/components/SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    render(<SearchBar onSearch={mockOnSearch} />);
  });

  it('renders the input field', () => {
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('updates the input value when text is entered', () => {
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'Test Query' } });
    expect(input).toHaveValue('Test Query');
  });

  it('calls the onSearch prop when input value changes', () => {
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'Test Query' } });
    expect(mockOnSearch).toHaveBeenCalledWith('Test Query');
  });
});
