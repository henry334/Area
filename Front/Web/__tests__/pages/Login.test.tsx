import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../src/pages/login';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

// Mock dependencies
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('react-cookie', () => ({
    useCookies: jest.fn(),
}));

describe('Login Component', () => {
    let setCookieMock: jest.Mock;
    let pushMock: jest.Mock;

    beforeEach(() => {
        setCookieMock = jest.fn();
        pushMock = jest.fn();

        (useRouter as jest.Mock).mockReturnValue({
            push: pushMock,
        });

        (useCookies as jest.Mock).mockReturnValue([{}, setCookieMock]);
    });

    it('renders correctly', () => {
        const { getByPlaceholderText, getByText } = render(<Login />);
        expect(getByPlaceholderText('Email')).toBeInTheDocument();
        expect(getByPlaceholderText('password')).toBeInTheDocument();
        const loginHeading = getByText((content, element) => content === 'Login' && element.tagName.toLowerCase() === 'h1');
        expect(loginHeading).toBeInTheDocument();
        expect(getByText("Don't have an account? Register here.")).toBeInTheDocument();
        expect(getByText('Continue with Google')).toBeInTheDocument();
    });

    it('handles input changes', () => {
        const { getByPlaceholderText } = render(<Login />);
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('password');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });

    it('handles successful login', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({ Bearer: 'testToken' }),
        });

        const { getByPlaceholderText, getByRole } = render(<Login />);
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('password');
        const loginButton = getByRole('button', { name: /login/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'test@example.com',
                    password: 'password123',
                }),
            });
            expect(setCookieMock).toHaveBeenCalledWith('authorization, 'testToken', { path: ' / ' });
            expect(pushMock).toHaveBeenCalledWith('/dashboard/services');
        });
    });

});
