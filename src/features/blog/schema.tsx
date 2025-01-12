import { z } from 'zod'

export const blogSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters')
    .trim(),

  content: z
    .string()
    .min(1, 'Content is required')
    .min(10, 'Content must be at least 10 characters')
    .max(1000, 'Content must not exceed 1000 characters')
    .trim(),

  date: z
    .string()
    .min(1, 'Date is required')
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    }),
})

export type BlogFormData = z.infer<typeof blogSchema>
