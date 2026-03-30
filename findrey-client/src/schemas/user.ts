import { z } from 'zod';

import { ObjectId } from './_schemas';

const imageSchema = z.object({
	data: z.instanceof(Uint8Array),
	contentType: z.string(),
});

export const userSchema = z.object({
	id: ObjectId,
	username: z.string().optional(),
	email: z.email(),
	image: imageSchema.optional(),
});
