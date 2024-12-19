import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Inertia } from '@inertiajs/inertia';
import SearchBar from '@/Components/SearchBar';

export default function Index() {
  const { achievements = [], filters = {} } = usePage().props;
  const [deletingAchievement, setDeletingAchievement] = useState(null);
  const [filteredAchievements, setFilteredAchievements] =
    useState(achievements);

  useEffect(() => {
    setFilteredAchievements(achievements);
  }, [achievements]);

  const confirmAchievementDeletion = (achievement) => {
    setDeletingAchievement(achievement);
  };

  const deleteAchievement = () => {
    if (deletingAchievement) {
      Inertia.delete(route('achievements.destroy', deletingAchievement.id), {
        onSuccess: () => setDeletingAchievement(null),
      });
    }
  };

  const closeModal = () => {
    setDeletingAchievement(null);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm?.trim()) {
      setFilteredAchievements(achievements);
      return;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    const filtered = achievements.filter((achievement) => {
      const title = achievement.title?.toLowerCase() || '';
      const date = achievement.date?.toLowerCase() || '';
      const details = achievement.details?.toLowerCase() || '';

      return (
        title.includes(searchLower) ||
        date.includes(searchLower) ||
        details.includes(searchLower)
      );
    });

    setFilteredAchievements(filtered);

    return (
      <AuthenticatedLayout
        header={
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Achievements
          </h2>
        }
      >
        <Head title="Achievements" />

        <div className="py-12">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mb-6 flex justify-end">
              <Link
                href={route('achievements.create')}
                className="rounded-md bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-gray-700"
              >
                Add Achievement
              </Link>
            </div>

            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="p-6">
                <SearchBar filters={filters} onSearch={handleSearch} />

                {filteredAchievements && filteredAchievements.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Title
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
                        {filteredAchievements.map((achievement) => (
                          <tr key={achievement.id}>
                            <td className="whitespace-nowrap px-6 py-4">
                              {achievement.title}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {achievement.achievement_date}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {achievement.document_path && (
                                <a
                                  href={`/storage/${achievement.document_path}`}
                                  target="_blank"
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  View Document
                                </a>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <Link
                                href={route(
                                  'achievements.edit',
                                  achievement.id
                                )}
                                className="mr-2 text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() =>
                                  confirmAchievementDeletion(achievement)
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
                  <p className="text-gray-500">No achievements found.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <Modal show={!!deletingAchievement} onClose={closeModal}>
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">
              Are you sure you want to delete this achievement?
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              Once this achievement is deleted, all of its resources and data
              will be permanently deleted.
            </p>

            <div className="mt-6 flex justify-end">
              <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

              <DangerButton className="ml-3" onClick={deleteAchievement}>
                Delete Achievement
              </DangerButton>
            </div>
          </div>
        </Modal>
      </AuthenticatedLayout>
    );
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Achievements
        </h2>
      }
    >
      <Head title="Achievements" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-end">
            <Link
              href={route('achievements.create')}
              className="rounded-md bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-gray-700"
            >
              Add Achievement
            </Link>
          </div>

          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
              <SearchBar filters={filters} onSearch={handleSearch} />

              {filteredAchievements && filteredAchievements.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Title
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
                      {filteredAchievements.map((achievement) => (
                        <tr key={achievement.id}>
                          <td className="whitespace-nowrap px-6 py-4">
                            {achievement.title}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {
                              new Date(achievement.achievement_date)
                                .toISOString()
                                .split('T')[0]
                            }
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {achievement.document_path && (
                              <a
                                href={`/storage/${achievement.document_path}`}
                                target="_blank"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                View Document
                              </a>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <Link
                              href={route('achievements.edit', achievement.id)}
                              className="mr-2 text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() =>
                                confirmAchievementDeletion(achievement)
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
                <p className="text-gray-500">No achievements found.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal show={!!deletingAchievement} onClose={closeModal}>
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Are you sure you want to delete this achievement?
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Once this achievement is deleted, all of its resources and data will
            be permanently deleted.
          </p>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

            <DangerButton className="ml-3" onClick={deleteAchievement}>
              Delete Achievement
            </DangerButton>
          </div>
        </div>
      </Modal>
    </AuthenticatedLayout>
  );
}
