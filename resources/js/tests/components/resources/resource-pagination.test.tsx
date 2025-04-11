import { render, screen } from '@testing-library/react';
import { ResourcePagination } from '@/components/resources/resource-pagination';

const mockLinks = [
    { url: null, label: '&laquo; Previous', active: false },
    { url: '/resources?page=1', label: '1', active: true },
    { url: '/resources?page=2', label: '2', active: false },
    { url: '/resources?page=3', label: '3', active: false },
    { url: '/resources?page=2', label: 'Next &raquo;', active: false },
];

describe('ResourcePagination', () => {
    it('renders all pagination links', () => {
        render(<ResourcePagination links={mockLinks} />);

        expect(screen.getByText('« Previous')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('Next »')).toBeInTheDocument();
    });

    it('applies correct styles to active link', () => {
        render(<ResourcePagination links={mockLinks} />);

        const activeLink = screen.getByText('1');
        expect(activeLink).toHaveClass('bg-blue-600', 'text-white');
    });

    it('applies correct styles to disabled link', () => {
        render(<ResourcePagination links={mockLinks} />);

        const disabledLink = screen.getByText('« Previous');
        expect(disabledLink).toHaveClass('text-gray-400', 'cursor-not-allowed');
    });

    it('applies correct styles to regular links', () => {
        render(<ResourcePagination links={mockLinks} />);

        const regularLink = screen.getByText('2');
        expect(regularLink).toHaveClass('bg-white', 'text-gray-700', 'hover:bg-gray-100');
    });
}); 