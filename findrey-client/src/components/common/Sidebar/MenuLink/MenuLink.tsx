import { Link, useRouterState } from '@tanstack/react-router';

import { MenuItemType } from '../types';

import styles from './menuLink.module.css';

interface MenuLinkProps {
  item: MenuItemType;
}

function MenuLink(props: Readonly<MenuLinkProps>) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <Link
      to={props.item.path}
      className={`${styles.container} ${
        pathname === props.item.path && styles.active
      }`}
    >
      {props.item.icon}
      {props.item.title}
    </Link>
  );
}

export default MenuLink;
