import { useForm } from '@inertiajs/react';
import { useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';

export default function SearchBar({ filters, onSearch }) {
  const { data, setData, get } = useForm({
    search: filters.search || '',
  });

  const debouncedSearch = useCallback(
    debounce((query) => {
      get(window.location.pathname, {
        preserveState: true,
        preserveScroll: true,
        only: [
          'filters',
          'achievements',
          'internships',
          'courses',
          'publications',
        ],
      });
      if (onSearch) {
        onSearch(query);
      }
    }, 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(data.search);
    return () => debouncedSearch.cancel();
  }, [data.search, debouncedSearch]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setData('search', value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        placeholder="Search..."
        value={data.search}
        onChange={handleSearchChange}
      />
    </div>
  );
}
