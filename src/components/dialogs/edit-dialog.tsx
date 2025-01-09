"use client"

import React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import BlogForm from "../forms/blog-form"
import { Button } from "@/components/ui/button"

interface EditDialogProps {
    blog: {
        id: string
        title: string
        content: string
        date: string
    }
}

export default function EditDialog({ blog }: EditDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-slate-900">Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit blog</DialogTitle>
                    <DialogDescription>Make changes to your blog here.</DialogDescription>
                </DialogHeader>
                <BlogForm
                    mode="edit"
                    id={blog.id}
                    initialData={{
                        title: blog.title,
                        content: blog.content,
                        date: blog.date,
                    }}
                />
            </DialogContent>
        </Dialog>
    )
}
