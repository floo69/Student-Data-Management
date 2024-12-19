import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function DeleteModal({ show, onClose, onDelete, resourceName }) {
    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Are you sure you want to delete this {resourceName}?
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Once this {resourceName} is deleted, all of its resources and data will be permanently deleted.
                </p>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
                    <DangerButton className="ml-3" onClick={onDelete}>
                        Delete {resourceName}
                    </DangerButton>
                </div>
            </div>
        </Modal>
    );
}