'use client'

import { useActionState } from 'react'
import { updateBlog } from '@/features/blog/actions'
import { useBlogForm } from '@/hooks/use-form'
import { BlogFormFields } from '@/components/forms/blog-form'
import { UpdateBlogFormProps, BlogFormState } from '@/types/types'

const initialState: BlogFormState = {
  message: '',
  errors: null,
}

export default function UpdateForm({
  id,
  title,
  content,
  date,
  onSuccess,
}: UpdateBlogFormProps) {
  const [state, formAction] = useActionState(updateBlog, initialState)
  const {
    fields,
    touched,
    clientErrors,
    isPending,
    handleChange,
    handleBlur,
    validateForm,
    startTransition,
  } = useBlogForm({ title, content, date })

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
        submitText="Update"
      />
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="title" value={fields.title} />
      <input type="hidden" name="content" value={fields.content} />
      <input
        type="hidden"
        name="date"
        value={fields.date ? fields.date.toISOString() : ''}
      />
    </form>
  )
}
