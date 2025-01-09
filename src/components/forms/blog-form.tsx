"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { updateBlog, createBlog } from "@/features/blog/actions"

interface BlogFormProps {
    id?: string
    initialData?: {
        title: string
        content: string
        date: string
    }
    mode: "create" | "edit"
}

export default function BlogForm({ id, initialData, mode }: BlogFormProps) {
    const defaultData = {
        title: "",
        content: "",
        date: new Date().toISOString(),
    }

    const [title, setTitle] = useState(initialData?.title || defaultData.title)
    const [content, setContent] = useState(initialData?.content || defaultData.content)
    const [date, setDate] = useState<Date>(initialData ? new Date(initialData.date) : new Date(defaultData.date))

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = {
                title,
                content,
                date: date.toISOString(),
            }

            if (mode === "edit" && id) {
                await updateBlog(id, formData)
            } else {
                await createBlog(id || "", formData)
            }
            window.location.reload()
        } catch (error) {
            console.error("Error in form submission:", error)
        }
    }

    // ฟังก์ชัน formatDate
    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-5">
                <div className="grid space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                            required
                        />
                    </div>
                </div>
                <div className="grid space-y-4">
                    <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter content"
                            required
                        />
                    </div>
                </div>
                <div className="grid space-y-4">
                    <div className="flex flex-col">
                        <Label htmlFor="date">Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className="w-full justify-start text-left font-normal mt-1"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? formatDate(date) : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(newDate) => newDate && setDate(newDate)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div>
                    <Button type="submit">{mode === "edit" ? "Update Blog" : "Create Blog"}</Button>
                </div>
            </div>
        </form>
    )
}
