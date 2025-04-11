import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ResourceFilters } from '@/components/resources/resource-filters';

const mockGet = jest.fn();

jest.mock('@inertiajs/react', () => ({
    useForm: () => ({
        data: {
            status: 'active',
            priority: '1',
            search: 'test',
        },
        setData: jest.fn(),
        get: mockGet,
    }),
}));

describe('ResourceFilters', () => {
    const initialFilters = {
        status: 'active',
        priority: '1',
        search: 'test',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders all filter inputs with initial values', () => {
        render(<ResourceFilters initialFilters={initialFilters} />);

        expect(screen.getByLabelText('Search')).toHaveValue('test');
        expect(screen.getByLabelText('Status')).toHaveValue('active');
        expect(screen.getByLabelText('Priority')).toHaveValue('1');
    });

    it('updates search input and triggers filter after debounce', async () => {
        render(<ResourceFilters initialFilters={initialFilters} />);

        const searchInput = screen.getByLabelText('Search');
        fireEvent.change(searchInput, { target: { value: 'new search' } });

        await waitFor(() => {
            expect(mockGet).toHaveBeenCalledWith('/resources', {
                preserveState: true,
                preserveScroll: true,
            });
        });
    });

    it('updates status select and triggers filter after debounce', async () => {
        render(<ResourceFilters initialFilters={initialFilters} />);

        const statusSelect = screen.getByLabelText('Status');
        fireEvent.change(statusSelect, { target: { value: 'inactive' } });

        await waitFor(() => {
            expect(mockGet).toHaveBeenCalledWith('/resources', {
                preserveState: true,
                preserveScroll: true,
            });
        });
    });

    it('updates priority select and triggers filter after debounce', async () => {
        render(<ResourceFilters initialFilters={initialFilters} />);

        const prioritySelect = screen.getByLabelText('Priority');
        fireEvent.change(prioritySelect, { target: { value: '2' } });

        await waitFor(() => {
            expect(mockGet).toHaveBeenCalledWith('/resources', {
                preserveState: true,
                preserveScroll: true,
            });
        });
    });
}); 