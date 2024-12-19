import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function DocumentInput({ label, error, onChange, currentDocument }) {
    return (
        <div>
            <InputLabel htmlFor="document" value={label} />
            <input
                id="document"
                type="file"
                className="mt-1 block w-full"
                onChange={onChange}
            />
            <InputError message={error} className="mt-2" />
            {currentDocument && (
                <div className="mt-2">
                    <a
                        href={currentDocument}
                        target="_blank"
                        className="text-sm text-indigo-600 hover:text-indigo-900"
                    >
                        View Current Document
                    </a>
                </div>
            )}
        </div>
    );
}