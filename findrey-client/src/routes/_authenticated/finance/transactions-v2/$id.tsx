import { CrudFormV2 } from '@findrey/components/pages/FinancePage/TransactionsV2/Crud';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_authenticated/finance/transactions-v2/$id',
)({
  component: CrudFormV2,
});