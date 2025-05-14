import React from 'react';
import { render, act } from '@testing-library/react';
import ServicesGrid from '../../src/components/ServicesGrid';
import { useBearerFetch } from '@/Utils/bearerFetch';

jest.mock('@/Utils/bearerFetch');

describe('ServicesGrid', () => {
    beforeEach(() => {
        (useBearerFetch as jest.Mock).mockReset();
    });

    it('renders services correctly', async () => {
        const mockServices: Service[] = [
            { name: 'Service1', logo: '', color: 'red', description: 'Description1' },
            { name: 'Service2', logo: '', color: 'blue', description: 'Description2' },
        ];

        (useBearerFetch as jest.Mock).mockReturnValue(() => Promise.resolve({
            json: () => Promise.resolve(mockServices)
        }));

        let container;
        await act(async () => {
            container = render(<ServicesGrid />);
        });

        expect(container.getByText('Service1')).toBeInTheDocument();
        expect(container.getByText('Service2')).toBeInTheDocument();
    });

    it('handles API call failure', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        (useBearerFetch as jest.Mock).mockReturnValue(() => Promise.reject(new Error('API Error')));

        await act(async () => {
            render(<ServicesGrid />);
        });

        expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching services:', new Error('API Error'));

        consoleErrorSpy.mockRestore();
    });
});
