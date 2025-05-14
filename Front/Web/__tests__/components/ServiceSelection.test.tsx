import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ServiceSelection from '../../src/components/ServiceSelection';

describe('ServiceSelection', () => {
    const mockServices = [
        { name: 'Service1', logo: '', color: 'red', description: '', parts: [] },
        { name: 'Service2', logo: '', color: 'blue', description: '', parts: [] },
    ];

    const mockOnServiceClick = jest.fn();
    const mockOnSelectPart = jest.fn();
    const mockOnBack = jest.fn();
    const mockOnClose = jest.fn();

    it('renders the service names when no service is selected', () => {
        render(
            <ServiceSelection
                services={mockServices}
                selectedService={null}
                onBack={mockOnBack}
                onClose={mockOnClose}
                onServiceClick={mockOnServiceClick}
                onSelectPart={mockOnSelectPart}
                partType="Part"
            />
        );

        expect(screen.getByText('Service1')).toBeInTheDocument();
        expect(screen.getByText('Service2')).toBeInTheDocument();
    });

    it('calls the onServiceClick prop when a service is clicked', () => {
        render(
            <ServiceSelection
                services={mockServices}
                selectedService={null}
                onBack={mockOnBack}
                onClose={mockOnClose}
                onServiceClick={mockOnServiceClick}
                onSelectPart={mockOnSelectPart}
                partType="Part"
            />
        );

        fireEvent.click(screen.getByText('Service1'));
        expect(mockOnServiceClick).toHaveBeenCalledWith(mockServices[0]);
    });

    // ... Add more tests for other functionalities

});
