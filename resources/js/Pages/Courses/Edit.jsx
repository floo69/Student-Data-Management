import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head } from '@inertiajs/react';

export default function Edit({ course }) {
  const { data, setData, post, processing, errors } = useForm({
    _method: 'PUT',
    name: course.name,
    institution: course.institution,
    completion_date: course.completion_date,
    document: null,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('courses.update', course.id));
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Edit Course
        </h2>
      }
    >
      <Head title="Edit Course" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
              <form onSubmit={submit} className="space-y-6">
                <div>
                  <InputLabel htmlFor="name" value="Course Name" />
                  <TextInput
                    id="name"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                  <InputLabel htmlFor="institution" value="Institution" />
                  <TextInput
                    id="institution"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.institution}
                    onChange={(e) => setData('institution', e.target.value)}
                    required
                  />
                  <InputError message={errors.institution} className="mt-2" />
                </div>
                <div>
                  <InputLabel
                    htmlFor="completion_date"
                    value="Completion Date"
                  />
                  <TextInput
                    id="completion_date"
                    type="date"
                    className="mt-1 block w-full"
                    value={data.completion_date}
                    onChange={(e) => setData('completion_date', e.target.value)}
                    required
                  />
                  <InputError
                    message={errors.completion_date}
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
                  {course.document_path && (
                    <div className="mt-2">
                      <a
                        href={`/storage/${course.document_path}`}
                        target="_blank"
                        className="text-sm text-indigo-600 hover:text-indigo-900"
                      >
                        View Current Document
                      </a>
                    </div>
                  )}
                </div>
                <PrimaryButton disabled={processing}>
                  Update Course
                </PrimaryButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
