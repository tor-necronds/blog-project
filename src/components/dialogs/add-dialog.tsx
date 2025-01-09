import React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import BlogForm from "../forms/blog-form"
import Addbtn from "@/app/manage/components/add-btn"

export default function AddDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Addbtn />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create blog</DialogTitle>
                    <DialogDescription>Make create to your blog here.</DialogDescription>
                </DialogHeader>
                <BlogForm />
            </DialogContent>
        </Dialog>
    )
}
