import { z } from "zod"

export type BlogFormState = {
    message: string
    errors: z.ZodError | null
}

export type TouchedFields = {
    title: boolean
    content: boolean
    date: boolean
}

export interface FormFields {
    title: string
    content: string
    date: Date | undefined
}

export interface BaseBlogFormProps {
    onSuccess?: () => void
}

export interface UpdateBlogFormProps extends BaseBlogFormProps {
    id: string
    title: string
    content: string
    date: Date
}
