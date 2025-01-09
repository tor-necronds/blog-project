import React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import BlogForm from "../forms/blog-form"
import { Button } from "../ui/button"

const EditDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="submit">Edit</Button>
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

export default EditDialog
