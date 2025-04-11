import { Head, usePage } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import { ResourceFormModal } from '@/components/resource-form-modal';
import { ResourceFilters } from '@/components/resources/resource-filters';
import { ResourceTable } from '@/components/resources/resource-table';
import { ResourcePagination } from '@/components/resources/resource-pagination';

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

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PageProps extends InertiaPageProps {
    resources: {
        data: Resource[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: PaginationLink[];
    };
    filters: {
        status?: string;
        priority?: string;
        search?: string;
    };
}

export default function Index() {
    const { props } = usePage<PageProps>();
    const resourceList = props.resources.data;
    const paginationLinks = props.resources.links;
    const filters = props.filters || {};
    const [feedback, setFeedback] = useState<FeedbackMessage | null>(null);

    const handleSuccess = (action: 'create' | 'update' | 'delete') => {
        setFeedback({
            text: `Resource ${action}d successfully.`,
            type: 'success',
        });

        setTimeout(() => setFeedback(null), 3000);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Resources', href: '/dashboard' }]}>
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

                <ResourceFilters initialFilters={filters} />
                <ResourceTable resources={resourceList} onSuccess={handleSuccess} />
                <ResourcePagination links={paginationLinks} />
            </div>
        </AppLayout>
    );
}
