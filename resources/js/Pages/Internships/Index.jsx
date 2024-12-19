import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Inertia } from '@inertiajs/inertia';

export default function Index() {
    const { internships } = usePage().props;
    const [deletingInternship, setDeletingInternship] = useState(null);

    const confirmInternshipDeletion = (internship) => {
        setDeletingInternship(internship);
    };

    const deleteInternship = () => {
        if (deletingInternship) {
            Inertia.delete(route('internships.destroy', deletingInternship.id), {
                onSuccess: () => setDeletingInternship(null),
            });
        }
    };

    const closeModal = () => {
        setDeletingInternship(null);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Internships</h2>}
        >
            <Head title="Internships" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-end">
                        <Link
                            href={route('internships.create')}
                            className="rounded-md bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-gray-700"
                        >
                            Add Internship
                        </Link>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {internships.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Company
                                                </th>
                                                <th className="px--wider text-gray-500">
                                                   Role
                                               </th>
                                               <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                   Dates
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
                                           {internships.map((internship) => (
                                               <tr key={internship.id}>
                                                   <td className="whitespace-nowrap px-6 py-4">
                                                       {internship.company}
                                                   </td>
                                                   <td className="whitespace-nowrap px-6 py-4">
                                                       {internship.role}
                                                   </td>
                                                   <td className="whitespace-nowrap px-6 py-4">
                                                       {internship.start_date} - {internship.end_date}
                                                   </td>
                                                   <td className="whitespace-nowrap px-6 py-4">
                                                       {internship.document_path && (
                                                           <a
                                                               href={`/storage/${internship.document_path}`}
                                                               target="_blank"
                                                               className="text-indigo-600 hover:text-indigo-900"
                                                           >
                                                               View Document
                                                           </a>
                                                       )}
                                                   </td>
                                                   <td className="whitespace-nowrap px-6 py-4">
                                                       <Link
                                                           href={route('internships.edit', internship.id)}
                                                           className="mr-2 text-indigo-600 hover:text-indigo-900"
                                                       >
                                                           Edit
                                                       </Link>
                                                       <button
                                                           onClick={() => confirmInternshipDeletion(internship)}
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
                               <p className="text-gray-500">No internships found.</p>
                           )}
                       </div>
                   </div>
               </div>
           </div>
            <Modal show={!!deletingInternship} onClose={closeModal}>
               <div className="p-6">
                   <h2 className="text-lg font-medium text-gray-900">
                       Are you sure you want to delete this internship?
                   </h2>
                   <p className="mt-1 text-sm text-gray-600">
                       Once this internship is deleted, all of its resources and data will be permanently deleted.
                   </p>
                   <div className="mt-6 flex justify-end">
                       <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                       <DangerButton
                           className="ml-3"
                           onClick={deleteInternship}
                       >
                           Delete Internship
                       </DangerButton>
                   </div>
               </div>
           </Modal>
       </AuthenticatedLayout>
   );
}