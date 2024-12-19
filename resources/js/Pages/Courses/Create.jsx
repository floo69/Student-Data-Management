import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        institution: '',
        completion_date: '',
        document: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('courses.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Add Course/Workshop</h2>}
        >
            <Head title="Add Course/Workshop" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Course/Workshop Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
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
                                        onChange={e => setData('institution', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.institution} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="completion_date" value="Completion Date" />
                                    <TextInput
                                        id="completion_date"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.completion_date}
                                        onChange={e => setData('completion_date', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.completion_date} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="document" value="Document" />
                                    <input
                                        id="document"
                                        type="file"
                                        className="mt-1 block w-full"
                                        onChange={e => setData('document', e.target.files[0])}
                                    />
                                    <InputError message={errors.document} className="mt-2" />
                                </div>

                                <PrimaryButton disabled={processing}>Add Course/Workshop</PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}