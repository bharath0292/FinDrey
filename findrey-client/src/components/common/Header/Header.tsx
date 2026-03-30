'use client';

import { MdNotifications } from 'react-icons/md';
import { usePathname } from 'next/navigation';

import styles from './header.module.css';

function Header() {
  const pathName = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathName?.split('/').pop() || 'Home'}</div>
      <div className={styles.menu}>
        <div className={styles.icons}>
          <MdNotifications size={20} />
        </div>
      </div>
    </div>
  );
}

export default Header;
