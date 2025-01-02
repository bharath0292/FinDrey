import { ReactElement } from 'react';
import { IconType } from 'react-icons';

export type MenuItemType = {
  title: string;
  path: string;
  icon: ReactElement<IconType>;
};

export type MenuCatType = {
  title: string;
  list: MenuItemType[];
};
