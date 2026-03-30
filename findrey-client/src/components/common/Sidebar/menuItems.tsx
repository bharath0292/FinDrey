import { BiCategory } from 'react-icons/bi';
import { FcDebt } from 'react-icons/fc';
import { GiProfit } from 'react-icons/gi';
import { GrTransaction } from 'react-icons/gr';
import {
  MdBalance,
  MdDashboard,
  MdHome,
  MdOutlineSettings,
} from 'react-icons/md';
import { TbFileInvoice } from 'react-icons/tb';

import { MenuCatType } from './types';

export const Items: MenuCatType[] = [
  {
    title: '',
    list: [{ title: 'Home', path: '/', icon: <MdHome /> }],
  },
  {
    title: 'Finance',
    list: [
      {
        title: 'Bills',
        path: '/finance/bills',
        icon: <TbFileInvoice />,
      },
      {
        title: 'Transactions',
        path: '/finance/transactions',
        icon: <GrTransaction />,
      },
    ],
  },
  {
    title: 'Analytics',
    list: [
      { title: 'Overview', path: '/analytics', icon: <MdDashboard /> },
      {
        title: 'Investment',
        path: '/analytics/investment',
        icon: <GiProfit />,
      },
      {
        title: 'Lend&Debt',
        path: '/analytics/lend-debt',
        icon: <FcDebt />,
      },
    ],
  },
  {
    title: 'User',
    list: [
      {
        title: 'Accounts',
        path: '/user/accounts',
        icon: <MdBalance />,
      },
      {
        title: 'Category',
        path: '/user/categories',
        icon: <BiCategory />,
      },
      {
        title: 'Settings',
        path: '/user',
        icon: <MdOutlineSettings />,
      },
    ],
  },
];
