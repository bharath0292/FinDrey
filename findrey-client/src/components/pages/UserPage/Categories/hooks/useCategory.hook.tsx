import { useContext } from 'react';

import { CategoryPageContext } from './context';

export default function useCategoryPageContext() {
  const context = useContext(CategoryPageContext);

  if (!context) {
    throw new Error(
      'useCategoryPageContext should be inside CategoryPageContext',
    );
  }

  return context;
}
