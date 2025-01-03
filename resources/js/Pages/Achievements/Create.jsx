import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head } from '@inertiajs/react';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    achievement_date: '',
    document: null,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('achievements.store'));
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Add Achievement
        </h2>
      }
    >
      <Head title="Add Achievement" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
              <form onSubmit={submit} className="space-y-6">
                <div>
                  <InputLabel htmlFor="title" value="Title" />
                  <TextInput
                    id="title"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    required
                  />
                  <InputError message={errors.title} className="mt-2" />
                </div>

                <div>
                  <InputLabel htmlFor="description" value="Description" />
                  <textarea
                    id="description"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    required
                  />
                  <InputError message={errors.description} className="mt-2" />
                </div>

                <div>
                  <InputLabel htmlFor="achievement_date" value="Date" />
                  <TextInput
                    id="achievement_date"
                    type="date"
                    className="mt-1 block w-full"
                    value={data.achievement_date}
                    onChange={(e) =>
                      setData('achievement_date', e.target.value)
                    }
                    required
                  />
                  <InputError
                    message={errors.achievement_date}
                    className="mt-2"
                  />
                </div>

                <div>
                  <InputLabel htmlFor="document" value="Document" />
                  <input
                    id="document"
                    type="file"
                    className="mt-1 block w-full"
                    onChange={(e) => setData('document', e.target.files[0])}
                  />
                  <InputError message={errors.document} className="mt-2" />
                </div>

                <PrimaryButton disabled={processing}>
                  Add Achievement
                </PrimaryButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
