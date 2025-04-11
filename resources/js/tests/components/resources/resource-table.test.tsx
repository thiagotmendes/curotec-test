import { render, screen } from '@testing-library/react';
import { ResourceTable } from '@/components/resources/resource-table';

const mockResources = [
    {
        id: 1,
        name: 'Test Resource 1',
        description: 'Description 1',
        status: 'active',
        priority: 1,
    },
    {
        id: 2,
        name: 'Test Resource 2',
        description: 'Description 2',
        status: 'inactive',
        priority: 2,
    },
];

describe('ResourceTable', () => {
    it('renders table with resources', () => {
        const onSuccess = jest.fn();
        render(<ResourceTable resources={mockResources} onSuccess={onSuccess} />);

        expect(screen.getByText('Test Resource 1')).toBeInTheDocument();
        expect(screen.getByText('Test Resource 2')).toBeInTheDocument();
        expect(screen.getByText('Description 1')).toBeInTheDocument();
        expect(screen.getByText('Description 2')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();
        expect(screen.getByText('Inactive')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('renders empty state when no resources', () => {
        const onSuccess = jest.fn();
        render(<ResourceTable resources={[]} onSuccess={onSuccess} />);

        expect(screen.getByText('No resources found.')).toBeInTheDocument();
    });

    it('renders correct status badges', () => {
        const onSuccess = jest.fn();
        render(<ResourceTable resources={mockResources} onSuccess={onSuccess} />);

        const activeBadge = screen.getByText('Active');
        const inactiveBadge = screen.getByText('Inactive');

        expect(activeBadge).toHaveClass('bg-green-100', 'text-green-800');
        expect(inactiveBadge).toHaveClass('bg-red-100', 'text-red-800');
    });
}); 