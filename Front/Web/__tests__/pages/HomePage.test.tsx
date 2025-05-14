import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import HomePage from '../../src/pages/index';

// Mock necessary modules
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('react-cookie', () => ({
    useCookies: jest.fn(),
}));

describe('HomePage', () => {
    let mockPush: jest.Mock;

    beforeEach(() => {
        mockPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
    });

    it('renders correctly', () => {
        (useCookies as jest.Mock).mockReturnValue([{}, jest.fn()]);
        const { getByText } = render(<HomePage />);
        expect(getByText('TITS')).toBeInTheDocument();
        expect(getByText(/tasks integrations/i)).toBeInTheDocument();
        expect(getByText('Get Started')).toBeInTheDocument();
    });

    it('redirects to /dashboard/services if bearer cookie is present', () => {
        (useCookies as jest.Mock).mockReturnValue([{ bearer: 'someToken' }, jest.fn()]);
        const { getByText } = render(<HomePage />);
        fireEvent.click(getByText('Get Started'));
        expect(mockPush).toHaveBeenCalledWith('/dashboard/services');
    });

    it('redirects to /login if bearer cookie is not present', () => {
        (useCookies as jest.Mock).mockReturnValue([{}, jest.fn()]);
        const { getByText } = render(<HomePage />);
        fireEvent.click(getByText('Get Started'));
        expect(mockPush).toHaveBeenCalledWith('/login');
    });
});
