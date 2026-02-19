'use client';
 
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import { useDebouncedCallback } from 'use-debounce';


export default function Search({ placeholder }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="mx-auto max-w-90 w-30rem">
      <input
        type="text"
        className="form-control"
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder} />
    </div>
  );
}

