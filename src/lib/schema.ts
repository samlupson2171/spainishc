import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  agency: z.string().max(50).optional().or(z.literal('')),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(9, 'Please enter a valid phone number'),
  callbackPreference: z.enum(['today', 'tomorrow', 'this_week']),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export interface Lead extends LeadFormData {
  _id?: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}
