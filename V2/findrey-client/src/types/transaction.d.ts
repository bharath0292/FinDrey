import type { transactionSchema } from '@findrey/schemas';

import type z from 'zod';

export type TransactionType = z.infer<typeof transactionSchema>;
