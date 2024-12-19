import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Inertia } from '@inertiajs/inertia';

export default function Index() {
    const { courses } = usePage().props;
    const [deletingCourse, setDeletingCourse] = useState(null);

    const confirmCourseDeletion = (course) => {
        setDeletingCourse(course);
    };

    const deleteCourse = () => {
        if (deletingCourse) {
            Inertia.delete(route('courses.destroy', deletingCourse.id), {
                onSuccess: () => setDeletingCourse(null),
            });
        }
    };

    const closeModal = () => {
        setDeletingCourse(null);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Courses</h2>}
        >
            <Head title="Courses" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-end">
                        <Link
                            href={route('courses.create')}
                            className="rounded-md bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-gray-700"
                        >
                            Add Course
                        </Link>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {courses.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Institution
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Completion Date
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Document
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {courses.map((course) => (
                                                <tr key={course.id}>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {course.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {course.institution}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {course.completion_date}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {course.document_path && (
                                                            <a
                                                                href={`/storage/${course.document_path}`}
                                                                target="_blank"
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                View Document
                                                            </a>
                                                        )}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <Link
                                                            href={route('courses.edit', course.id)}
                                                            className="mr-2 text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => confirmCourseDeletion(course)}
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
                            ) : (
                                <p className="text-gray-500">No courses found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={!!deletingCourse} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete this course?
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Once this course is deleted, all of its resources and data will be permanently deleted.
                    </p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <DangerButton
                            className="ml-3"
                            onClick={deleteCourse}
                        >
                            Delete Course
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}