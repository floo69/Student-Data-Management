import { Link } from '@inertiajs/react';

export default function Table({ columns, data, onDelete, resourceName }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                                {column.label}
                            </th>
                        ))}
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {data.map((item) => (
                        <tr key={item.id}>
                            {columns.map((column) => (
                                <td key={`${item.id}-${column.key}`} className="whitespace-nowrap px-6 py-4">
                                    {column.render ? column.render(item) : item[column.key]}
                                </td>
                            ))}
                            <td className="whitespace-nowrap px-6 py-4">
                                <Link
                                    href={route(`${resourceName}.edit`, item.id)}
                                    className="mr-2 text-indigo-600 hover:text-indigo-900"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => onDelete(item)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}