import { useRouterState } from '@tanstack/react-router';
import { MdNotifications } from 'react-icons/md';

import styles from './header.module.css';

function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname?.split('/').pop() || 'Home'}</div>
      <div className={styles.menu}>
        <div className={styles.icons}>
          <MdNotifications size={20} />
        </div>
      </div>
    </div>
  );
}

export default Header;
