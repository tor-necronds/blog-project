"use server"

import { blogSchema } from "./schema"
import { z } from "zod"

export async function createBlog(
    prevState: {
        message: string
        errors?: z.ZodError | null
    },
    formData: FormData
) {
    try {
        const data = {
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            date: formData.get("date") as string,
        }

        const validationResult = blogSchema.safeParse(data)

        if (!validationResult.success) {
            return {
                message: "Validation failed",
                errors: validationResult.error,
            }
        }

        const response = await fetch("https://677e3ae094bde1c1252affe2.mockapi.io/blogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        const responseData = await response.json()
        return { message: "Blog created successfully", data: responseData }
    } catch (error) {
        return { message: "Failed to create blog", errors: null }
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
            id: formData.get("id") as string,
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            date: formData.get("date") as string,
        }

        const validationResult = blogSchema.safeParse(data)

        if (!validationResult.success) {
            return {
                message: "Validation failed",
                errors: validationResult.error,
            }
        }

        const response = await fetch(`https://677e3ae094bde1c1252affe2.mockapi.io/blogs/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        const responseData = await response.json()
        return { message: "Blog updated successfully", data: responseData }
    } catch (error) {
        return { message: "Failed to update blog", errors: null }
    }
}

export async function deleteBlog(
    prevState: {
        message: string
    },
    formData: FormData
) {
    try {
        const data = {
            id: formData.get("id") as string,
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            date: formData.get("date") as string,
        }

        const response = await fetch(`https://677e3ae094bde1c1252affe2.mockapi.io/blogs/${data.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (!response.ok) {
            throw new Error("Failed to delete the blog post.")
        }
        const responseData = await response.json()
        console.log("Deleted blog:", responseData)
        return responseData
    } catch (error) {
        console.error(error)
    }
}
