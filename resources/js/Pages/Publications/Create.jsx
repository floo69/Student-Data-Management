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
        journal: '',
        publication_date: '',
        document: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('publications.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Add Publication</h2>}
        >
            <Head title="Add Publication" />

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
                                        onChange={e => setData('title', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="journal" value="Journal" />
                                    <TextInput
                                        id="journal"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.journal}
                                        onChange={e => setData('journal', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.journal} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="publication_date" value="Publication Date" />
                                    <TextInput
                                        id="publication_date"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.publication_date}
                                        onChange={e => setData('publication_date', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.publication_date} className="mt-2" />
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

                                <PrimaryButton disabled={processing}>Add Publication</PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}