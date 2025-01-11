"use client"

import { useActionState } from "react"
import { createBlog } from "@/features/blog/actions"
import { useBlogForm } from "@/hooks/use-form"
import { BlogFormFields } from "@/components/forms/blog-form"
import { BaseBlogFormProps, BlogFormState } from "@/types/types"

const initialState: BlogFormState = {
    message: "",
    errors: null,
}

export default function CreateForm({ onSuccess }: BaseBlogFormProps) {
    const [state, formAction] = useActionState(createBlog, initialState)
    const { fields, touched, clientErrors, isPending, handleChange, handleBlur, validateForm, startTransition } =
        useBlogForm()

    const handleSubmit = async (formData: FormData) => {
        if (!validateForm()) return

        startTransition(async () => {
            await formAction(formData)
            if (!state.errors) {
                onSuccess?.()
            }
        })
    }

    return (
        <form action={handleSubmit}>
            <BlogFormFields
                fields={fields}
                touched={touched}
                clientErrors={clientErrors}
                onFieldChange={handleChange}
                onFieldBlur={handleBlur}
                isPending={isPending}
                submitText="Create"
            />
            <input type="hidden" name="title" value={fields.title} />
            <input type="hidden" name="content" value={fields.content} />
            <input type="hidden" name="date" value={fields.date ? fields.date.toISOString() : ""} />
        </form>
    )
}
