import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function CrudLayout({ title, children, createRoute }) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          {title}
        </h2>
      }
    >
      <Head title={title} />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {createRoute && (
            <div className="mb-6 flex justify-end">
              <Link
                href={createRoute}
                className="rounded-md bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-gray-700"
              >
                Add {title}
              </Link>
            </div>
          )}

          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">{children}</div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
