import { ObjectId } from '@findrey/schemas/_schemas';

import { z } from 'zod';

export const transactionSchema = z.object({
	id: z.string().optional(),
	userId: ObjectId,
	transactionDate: z.date(),
	transactionType: ObjectId,
	subTransactionType: ObjectId.optional(),
	category: ObjectId.optional(),
	creditAccount: ObjectId.optional(),
	debitAccount: ObjectId.optional(),
	description: z.string(),
	amount: z.float32(),
});
