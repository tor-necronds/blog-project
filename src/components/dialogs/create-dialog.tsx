
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import CreateForm from "../../app/manage/components/create-form";
import Addbtn from "@/app/manage/components/add-btn";

export default function CreateDialog() {
  console.log("แสดงแล้ว")
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
        <CreateForm />
      </DialogContent>
    </Dialog>
  );
}
