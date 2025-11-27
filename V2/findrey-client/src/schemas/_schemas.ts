import z from 'zod';

export const ObjectId = z.string().length(24);
