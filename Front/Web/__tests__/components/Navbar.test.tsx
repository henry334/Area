import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../../src/components/Navbar';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('Navbar', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            route: '/',
            pathname: '/',
            query: '',
            asPath: '',
        });
    });

    it('renders the logo and TITS text', () => {
        render(<Navbar />);
        expect(screen.getByText('TITS')).toBeInTheDocument();
    });

    it('renders the Services link', () => {
        render(<Navbar />);
        expect(screen.getByText('Services')).toBeInTheDocument();
    });

    it('renders the Create link', () => {
        render(<Navbar />);
        expect(screen.getByText('Create')).toBeInTheDocument();
    });

    it('renders the My Areas link', () => {
        render(<Navbar />);
        expect(screen.getByText('My Areas')).toBeInTheDocument();
    });

    it('renders the user icon', () => {
        render(<Navbar />);
        const userIcon = screen.getByTestId('user-icon');
        expect(userIcon).toBeInTheDocument();
    });
});
