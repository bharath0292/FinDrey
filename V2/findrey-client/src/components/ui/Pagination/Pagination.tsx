'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import styles from './pagination.module.css';

interface PaginationProps {
  itemsPerPage: number;
  count?: number;
}

function Pagination(props: Readonly<PaginationProps>) {
  const { itemsPerPage, count } = props;
  const pathName = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams?.get('page') ?? '1';

  const params = new URLSearchParams(searchParams || undefined);

  const hasPrev = itemsPerPage * (parseInt(page) - 1) > 0;
  const hasNext =
    itemsPerPage * (parseInt(page) - 1) + itemsPerPage < (count ?? 0);

  const handleChanagePage = (type: 'prev' | 'next') => {
    type === 'prev'
      ? params.set('page', String(parseInt(page) - 1))
      : params.set('page', String(parseInt(page) + 1));

    replace(`${pathName}?${params}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handleChanagePage('prev')}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => handleChanagePage('next')}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
