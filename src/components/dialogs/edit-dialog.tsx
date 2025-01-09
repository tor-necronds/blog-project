import React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import BlogForm from "../forms/blog-form"
import Editbtn from "@/app/manage/components/edit-btn"

export default function EditDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Editbtn />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit blog</DialogTitle>
                    <DialogDescription>Make changes to your blog here.</DialogDescription>
                </DialogHeader>
                <BlogForm />
            </DialogContent>
        </Dialog>
    )
}
