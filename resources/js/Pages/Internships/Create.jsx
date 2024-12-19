import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        company: '',
        role: '',
        start_date: '',
        end_date: '',
        document: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('internships.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Add Internship</h2>}
        >
            <Head title="Add Internship" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="company" value="Company" />
                                    <TextInput
                                        id="company"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.company}
                                        onChange={e => setData('company', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.company} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="role" value="Role" />
                                    <TextInput
                                        id="role"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.role}
                                        onChange={e => setData('role', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.role} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="start_date" value="Start Date" />
                                    <TextInput
                                        id="start_date"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.start_date}
                                        onChange={e => setData('start_date', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.start_date} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="end_date" value="End Date" />
                                    <TextInput
                                        id="end_date"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.end_date}
                                        onChange={e => setData('end_date', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.end_date} className="mt-2" />
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

                                <PrimaryButton disabled={processing}>Add Internship</PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
