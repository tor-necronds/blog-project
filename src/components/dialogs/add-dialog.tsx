import React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import BlogForm from "../forms/blog-form"
import AddBtn from "@/app/manage/components/add-btn"

export default function CreateDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <AddBtn />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create blog</DialogTitle>
                    <DialogDescription>Make create to your blog here.</DialogDescription>
                </DialogHeader>
                <BlogForm mode="create" />
            </DialogContent>
        </Dialog>
    )
}
