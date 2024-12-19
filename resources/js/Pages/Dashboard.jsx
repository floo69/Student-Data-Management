import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="mb-6 text-lg font-medium">Add New Entry</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <Link
                                    href={route('achievements.index')}
                                    className="flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
                                >
                                    Add Achievement
                                </Link>
                                <Link
                                    href={route('internships.index')}
                                    className="flex items-center justify-center rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                                >
                                    Add Internship
                                </Link>
                                <Link
                                    href={route('courses.index')}
                                    className="flex items-center justify-center rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                                >
                                    Add Course/Workshop
                                </Link>
                                <Link
                                    href={route('publications.index')}
                                    className="flex items-center justify-center rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
                                >
                                    Add Publication
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
