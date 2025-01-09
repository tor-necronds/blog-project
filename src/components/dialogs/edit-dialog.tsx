import React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import Editbtn from "@/app/manage/components/edit-btn"
import UpdateForm from "@/app/manage/components/update-form"



interface EditDialogProps {
    id: string;
    title: string;
    content: string;
    date: Date;
  }

export default function EditDialog({ id, title, content, date }:EditDialogProps) {
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
                <UpdateForm
                id={id}
                title={title}
                content={content}
                date={new Date(date)}/>
            </DialogContent>
        </Dialog>
    )
}
