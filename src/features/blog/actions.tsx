"use server"

export async function createBlog(id: string, data: { title: string; content: string; date: string }) {
    try {
        const response = await fetch(`https://677e3ae094bde1c1252affe2.mockapi.io/blogs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error("Failed to create blog")
        }

        return response.json()
    } catch (error) {
        console.error("Error creating blog:", error)
        throw error
    }
}

export async function updateBlog(id: string, data: { title: string; content: string; date: string }) {
    try {
        const response = await fetch(`https://677e3ae094bde1c1252affe2.mockapi.io/blogs/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error("Failed to update blog")
        }

        return response.json()
    } catch (error) {
        console.error("Error updating blog:", error)
        throw error
    }
}

// export async function deleteBlog() {}
