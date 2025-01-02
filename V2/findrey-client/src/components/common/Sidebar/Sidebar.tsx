import { MdLogout } from 'react-icons/md';
import Image from 'next/image';

import noavatar from '@findrey/assets/noavatar.jpg';

import { Items } from './menuItems';
import MenuLink from './MenuLink/MenuLink';
import styles from './sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={noavatar}
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>John Joe</span>
          <span className={styles.usertitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {Items.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <button className={styles.logout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
