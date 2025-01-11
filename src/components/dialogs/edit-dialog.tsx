"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import UpdateForm from "@/app/manage/components/update-form"
import { Button } from "../ui/button"

interface EditDialogProps {
    id: string
    title: string
    content: string
    date: Date
}

export default function EditDialog({ id, title, content, date }: EditDialogProps) {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-zinc-900 hover:bg-zinc-700" type="submit">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit blog</DialogTitle>
                    <DialogDescription>Make changes to your blog here.</DialogDescription>
                </DialogHeader>
                <UpdateForm
                    id={id}
                    title={title}
                    content={content}
                    date={new Date(date)}
                    onSuccess={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    )
}
