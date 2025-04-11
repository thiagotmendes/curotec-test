import { Head, usePage, useForm } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useEffect, useState } from 'react';
import { ResourceFormModal } from '@/components/resource-form-modal';
import { DeleteResourceModal } from '@/components/delete-resource-modal';

interface FeedbackMessage {
    text: string;
    type: 'success' | 'error';
}

interface Resource {
    id: number;
    name: string;
    description: string;
    status: string;
    priority: number;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface PageProps extends InertiaPageProps {
    resources: {
        data: Resource[];
        meta: PaginationMeta;
    };
    filters: {
        status?: string;
        priority?: string;
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Resources',
        href: '/dashboard',
    },
];

export default function Resources() {
    const { props } = usePage<PageProps>();
    const resources = props.resources?.data || [];
    const pagination = props.resources?.meta || {};
    const filters = props.filters || {};
    const [feedback, setFeedback] = useState<FeedbackMessage | null>(null);

    const { data, setData, get } = useForm({
        status: filters.status || '',
        priority: filters.priority || '',
        search: filters.search || '',
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

    const handleSuccess = (action: 'create' | 'update' | 'delete') => {
        get('/resources', {
            preserveState: true,
            preserveScroll: true,
        });

        setFeedback({
            text: `Resource ${action === 'create' ? 'created' : action === 'update' ? 'updated' : 'deleted'} successfully.`,
            type: 'success'
        });

        // Clear feedback after 3 seconds
        setTimeout(() => setFeedback(null), 3000);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Resources" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {feedback && (
                    <div className={`p-4 rounded-md ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {feedback.text}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Resources</h1>
                    <ResourceFormModal mode="create" onSuccess={() => handleSuccess('create')} />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-6">
                    <div className="flex-1 min-w-[250px]">
                        <label htmlFor="search" className="mb-2 block text-sm font-medium text-white">
                            Search
                        </label>
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
                        <label htmlFor="status" className="mb-2 block text-sm font-medium text-white">
                            Status
                        </label>
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
                        <label htmlFor="priority" className="mb-2 block text-sm font-medium text-white">
                            Priority
                        </label>
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

                <div className="overflow-x-auto rounded border">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Description</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Priority</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {resources.length > 0 ? (
                            resources.map((resource: Resource) => (
                                <tr key={resource.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <td className="border px-4 py-2">{resource.name}</td>
                                    <td className="border px-4 py-2">{resource.description}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            resource.status === 'active' 
                                                ? 'bg-green-100 text-green-800' 
                                                : resource.status === 'inactive' 
                                                    ? 'bg-red-100 text-red-800' 
                                                    : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {resource.status.charAt(0).toUpperCase() + resource.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2">{resource.priority}</td>
                                    <td className="border px-4 py-2">
                                        <div className="flex items-center justify-center space-x-2">
                                            <ResourceFormModal
                                                mode="edit"
                                                resource={resource}
                                                onSuccess={() => handleSuccess('update')}
                                            />
                                            <DeleteResourceModal
                                                resource={resource}
                                                onSuccess={() => handleSuccess('delete')}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="border px-4 py-4 text-center" colSpan={5}>
                                    No resources found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination.total > pagination.per_page && (
                    <div className="mt-4 text-sm text-gray-600">
                        Page {pagination.current_page} of {pagination.last_page}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
