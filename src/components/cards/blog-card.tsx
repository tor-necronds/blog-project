import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatDate } from '@/utils/format-date'
import { truncateText } from '@/utils/text-utils'
interface BlogCardProps {
  key: string
  title: string
  content: string
  date: Date
}

export default function BlogCard({ title, content, date }: BlogCardProps) {
  const formattedDate = formatDate(date)
  const truncatedContent = truncateText(content)

  return (
    <>
      <Card className="min-w-3xl">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{truncatedContent}</CardContent>
        <CardFooter className="flex justify-end text-[14px]">
          {formattedDate}
        </CardFooter>
      </Card>
    </>
  )
}
