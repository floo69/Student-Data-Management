import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Inertia } from '@inertiajs/inertia';
import SearchBar from '@/Components/SearchBar';

export default function Index() {
  const { publications = [], filters = {} } = usePage().props;
  const [deletingPublication, setDeletingPublication] = useState(null);
  const [filteredPublications, setFilteredPublications] =
    useState(publications);

  useEffect(() => {
    setFilteredPublications(publications);
  }, [publications]);

  const confirmPublicationDeletion = (publication) => {
    setDeletingPublication(publication);
  };

  const deletePublication = () => {
    if (deletingPublication) {
      Inertia.delete(route('publications.destroy', deletingPublication.id), {
        onSuccess: () => setDeletingPublication(null),
      });
    }
  };

  const closeModal = () => {
    setDeletingPublication(null);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm?.trim()) {
      setFilteredPublications(publications);
      return;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    const filtered = publications.filter((publication) => {
      const title = publication.title?.toLowerCase() || '';
      const journal = publication.journal?.toLowerCase() || '';
      const publicationDate = publication.publication_date?.toLowerCase() || '';

      return (
        title.includes(searchLower) ||
        journal.includes(searchLower) ||
        publicationDate.includes(searchLower)
      );
    });

    setFilteredPublications(filtered);
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Publications
        </h2>
      }
    >
      <Head title="Publications" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-end">
            <Link
              href={route('publications.create')}
              className="rounded-md bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-gray-700"
            >
              Add Publication
            </Link>
          </div>

          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
              <SearchBar filters={filters} onSearch={handleSearch} />

              {filteredPublications.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Journal
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Date
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
                      {filteredPublications.map((publication) => (
                        <tr key={publication.id}>
                          <td className="whitespace-nowrap px-6 py-4">
                            {publication.title}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {publication.journal}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {
                              new Date(publication.publication_date)
                                .toISOString()
                                .split('T')[0]
                            }
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {publication.document_path && (
                              <a
                                href={`/storage/${publication.document_path}`}
                                target="_blank"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                View Document
                              </a>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <Link
                              href={route('publications.edit', publication.id)}
                              className="mr-2 text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() =>
                                confirmPublicationDeletion(publication)
                              }
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
                <p className="text-gray-500">No publications found.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal show={!!deletingPublication} onClose={closeModal}>
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Are you sure you want to delete this publication?
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Once this publication is deleted, all of its resources and data will
            be permanently deleted.
          </p>
          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
            <DangerButton className="ml-3" onClick={deletePublication}>
              Delete Publication
            </DangerButton>
          </div>
        </div>
      </Modal>
    </AuthenticatedLayout>
  );
}
