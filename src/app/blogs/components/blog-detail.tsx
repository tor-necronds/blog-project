'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import useSWR from 'swr'

interface BlogProps {
  blogId: string
  isOpen: boolean
  onClose: () => void
}
import { formatDate } from '../../../utils/format-date'

export default function BlogDetail({ blogId, isOpen, onClose }: BlogProps) {
  const { data, error, isLoading } = useSWR(
    `https://677e3ae094bde1c1252affe2.mockapi.io/blogs/${blogId}`
  )

  if (isLoading) {
    return
  }

  if (error) {
    return
  }

  const formattedDate = data ? formatDate(new Date(data.date)) : ''
  console.log(data)
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-left mb-2">{data.title}</DialogTitle>
          <DialogDescription className="text-left">
            {data.content}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="text-right">{formattedDate}</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
