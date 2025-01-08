'use client';

import { ChangeEvent, useEffect, useMemo, useState } from 'react';
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams || undefined),
    [searchParams],
  );

  const [value, setValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    handleSearch(e);
  };

  const handleSearch = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value.trim();

      params.set('page', '1');

      if (searchValue) {
        params.set('query', searchValue);
      } else {
        params.delete('query');
      }

      router.replace(`${pathName}?${params.toString()}`);
    },
    300,
  );

  useEffect(() => {
    const queryValue = params.get('query');
    setValue(queryValue ?? '');
  }, [params]);

  return (
    <div className={styles.container}>
      <MdSearch className={styles.icon} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className={styles.input}
      />
    </div>
  );
}

export default Search;
