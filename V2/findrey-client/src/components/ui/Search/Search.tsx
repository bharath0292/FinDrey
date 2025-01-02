'use client';
import { ChangeEvent } from 'react';
import { MdSearch } from 'react-icons/md';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import styles from './search.module.css';

interface SearchProps {
  placeholder: string;
}

function Search(props: Readonly<SearchProps>) {
  const { placeholder } = props;

  const pathName = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const params = new URLSearchParams(searchParams || undefined);

      params.set('page', '1');
      if (value) {
        params.set('query', e.target.value);
      } else {
        params.delete('query');
      }
      replace(`${pathName}?${params}`);
    },
    300,
  );

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
