import { Link } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface ResourcePaginationProps {
    links: PaginationLink[];
}

export function ResourcePagination({ links }: ResourcePaginationProps) {
    return (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-600">
            {links.map((link, i) => (
                <Link
                    key={i}
                    href={link.url || ''}
                    className={`px-3 py-1 rounded border ${
                        link.active
                            ? 'bg-blue-600 text-white'
                            : !link.url
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    preserveScroll
                    preserveState
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
} 