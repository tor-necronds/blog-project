'use server'

import { blogSchema } from './schema'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export async function createBlog(
  prevState: {
    message: string
    errors?: z.ZodError | null
  },
  formData: FormData
) {
  try {
    const data = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      date: formData.get('date') as string,
    }

    const validationResult = blogSchema.safeParse(data)

    if (!validationResult.success) {
      return {
        message: 'Validation failed',
        errors: validationResult.error,
      }
    }

    console.log(data)
    const response = await fetch(
      'https://677e3ae094bde1c1252affe2.mockapi.io/blogs',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    const responseData = await response.json()
    console.log(responseData)
    revalidatePath('/manage')
    return responseData
  } catch (error) {
    console.log(error)
  }
}

export async function updateBlog(
  prevState: {
    message: string
    errors?: z.ZodError | null
  },
  formData: FormData
) {
  try {
    const data = {
      id: formData.get('id') as string,
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      date: formData.get('date') as string,
    }

    const validationResult = blogSchema.safeParse(data)

    if (!validationResult.success) {
      return {
        message: 'Validation failed',
        errors: validationResult.error,
      }
    }

    const response = await fetch(
      `https://677e3ae094bde1c1252affe2.mockapi.io/blogs/${data.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )

    const responseData = await response.json()
    console.log(responseData)
    revalidatePath('/manage')
    return responseData
  } catch (error) {
    return { message: 'Failed to update blog', errors: null }
  }
}

export async function deleteBlog(id: string) {
  try {
    const response = await fetch(
      `https://677e3ae094bde1c1252affe2.mockapi.io/blogs/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to delete the blog post.')
    }

    const responseData = await response.json()
    console.log('Deleted blog:', responseData)
    revalidatePath('/manage')
    return responseData
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function fetchBlogs() {
  try {
    const res = await fetch(
      'https://677e3ae094bde1c1252affe2.mockapi.io/blogs',
      {
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) {
      throw new Error('Failed to fetch blogs')
    }

    return res.json()
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}
