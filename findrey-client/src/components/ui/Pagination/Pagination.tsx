import { useNavigate, useRouterState } from '@tanstack/react-router';

import styles from './pagination.module.css';

interface PaginationProps {
  itemsPerPage: number;
  count?: number;
}

function Pagination(props: Readonly<PaginationProps>) {
  const { itemsPerPage, count } = props;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const rawSearch = useRouterState({ select: (s) => s.location.search });
  const navigate = useNavigate();

  const params = new URLSearchParams(rawSearch || undefined);
  const page = params.get('page') ?? '1';

  const hasPrev = itemsPerPage * (parseInt(page, 10) - 1) > 0;
  const hasNext = itemsPerPage * (parseInt(page, 10) - 1) + itemsPerPage < (count ?? 0);

  const handleChangePage = (type: 'prev' | 'next') => {
    const next = new URLSearchParams(params);
    type === 'prev'
      ? next.set('page', String(parseInt(page, 10) - 1))
      : next.set('page', String(parseInt(page, 10) + 1));
    navigate({ to: pathname, search: Object.fromEntries(next.entries()), replace: true });
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handleChangePage('prev')}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => handleChangePage('next')}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
