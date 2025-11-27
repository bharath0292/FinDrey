import type { userSchema } from '@findrey/schemas';

import type z from 'zod';

export type UserType = z.infer<typeof userSchema>;
