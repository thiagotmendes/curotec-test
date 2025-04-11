import { ResourceFormModal } from '@/components/resource-form-modal';
import { DeleteResourceModal } from '@/components/delete-resource-modal';

interface Resource {
    id: number;
    name: string;
    description: string;
    status: string;
    priority: number;
}

interface ResourceTableProps {
    resources: Resource[];
    onSuccess: (action: 'create' | 'update' | 'delete') => void;
}

export function ResourceTable({ resources, onSuccess }: ResourceTableProps) {
    return (
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
                        resources.map((resource) => (
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
                                            onSuccess={() => onSuccess('update')}
                                        />
                                        <DeleteResourceModal
                                            resource={resource}
                                            onSuccess={() => onSuccess('delete')}
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
    );
} 