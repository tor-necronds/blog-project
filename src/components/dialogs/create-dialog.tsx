'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import CreateForm from '@/app/manage/components/create-form'
import { Button } from '@/components/ui/button'

export default function CreateDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" type="submit">
          Create Blog
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create blog</DialogTitle>
          <DialogDescription>Make create to your blog here.</DialogDescription>
        </DialogHeader>
        <CreateForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
