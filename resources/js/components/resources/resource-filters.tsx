import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

interface ResourceFiltersProps {
    initialFilters: {
        status?: string;
        priority?: string;
        search?: string;
    };
}

export function ResourceFilters({ initialFilters }: ResourceFiltersProps) {
    const { data, setData, get } = useForm({
        status: initialFilters.status || '',
        priority: initialFilters.priority || '',
        search: initialFilters.search || '',
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            get('/resources', {
                preserveState: true,
                preserveScroll: true,
            });
        }, 500);

        return () => clearTimeout(timeout);
    }, [data.status, data.priority, data.search]);

    return (
        <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[250px]">
                <label htmlFor="search" className="mb-2 block text-sm font-medium text-white">Search</label>
                <input
                    type="text"
                    id="search"
                    value={data.search}
                    onChange={(e) => setData('search', e.target.value)}
                    className="block w-full rounded-md border-gray-300 bg-gray-100 px-4 py-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                    placeholder="Search by name..."
                />
            </div>

            <div className="flex-1 min-w-[250px]">
                <label htmlFor="status" className="mb-2 block text-sm font-medium text-white">Status</label>
                <select
                    id="status"
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    className="block w-full rounded-md border-gray-300 bg-gray-100 px-4 py-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

            <div className="flex-1 min-w-[250px]">
                <label htmlFor="priority" className="mb-2 block text-sm font-medium text-white">Priority</label>
                <select
                    id="priority"
                    value={data.priority}
                    onChange={(e) => setData('priority', e.target.value)}
                    className="block w-full rounded-md border-gray-300 bg-gray-100 px-4 py-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                >
                    <option value="">All Priorities</option>
                    <option value="1">High (1)</option>
                    <option value="2">Medium (2)</option>
                    <option value="3">Low (3)</option>
                </select>
            </div>
        </div>
    );
} 