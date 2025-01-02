'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MenuItemType } from '../types';

import styles from './menuLink.module.css';

interface MenuLinkProps {
  item: MenuItemType;
}

function MenuLink(props: Readonly<MenuLinkProps>) {
  const pathName = usePathname();
  return (
    <Link
      href={props.item.path}
      className={`${styles.container} ${
        pathName === props.item.path && styles.active
      }`}
    >
      {props.item.icon}
      {props.item.title}
    </Link>
  );
}

export default MenuLink;
