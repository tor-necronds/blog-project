import React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import BlogForm from "../forms/blog-form"
import { Button } from "../ui/button"


export default function CreateDialog () {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="submit">Add</Button>
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

