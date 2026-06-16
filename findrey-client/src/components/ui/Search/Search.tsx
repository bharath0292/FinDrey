import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { useNavigate, useRouterState } from '@tanstack/react-router';
import { MdSearch } from 'react-icons/md';
import { useDebouncedCallback } from 'use-debounce';

import styles from './search.module.css';

interface SearchProps {
  placeholder: string;
}

function Search(props: Readonly<SearchProps>) {
  const { placeholder } = props;

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const rawSearch = useRouterState({ select: (s) => s.location.search });
  const navigate = useNavigate();

  const params = useMemo(
    () => new URLSearchParams(rawSearch || undefined),
    [rawSearch],
  );

  const [value, setValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    handleSearch(e);
  };

  const handleSearch = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value.trim();
      const next = new URLSearchParams(params);
      next.set('page', '1');
      if (searchValue) {
        next.set('query', searchValue);
      } else {
        next.delete('query');
      }
      navigate({ to: pathname, search: Object.fromEntries(next.entries()), replace: true });
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
