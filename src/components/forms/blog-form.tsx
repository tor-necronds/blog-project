"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface BlogFormFieldsProps {
    title: string
    setTitle: (value: string) => void
    content: string
    setContent: (value: string) => void
    date: Date | undefined
    setDate: (value: Date | undefined) => void
    errors?: { path: string[]; message: string }[]
}

export function BlogFormFields({ title, setTitle, content, setContent, date, setDate, errors }: BlogFormFieldsProps) {
    return (
        <div className="grid gap-5">
            <div className="grid space-y-4">
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors?.find((err) => err.path.includes("title")) && (
                        <p className="text-red-500">{errors.find((err) => err.path.includes("title"))?.message}</p>
                    )}
                </div>
            </div>
            <div className="grid space-y-4">
                <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                        id="content"
                        placeholder="Enter content"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    {errors?.find((err) => err.path.includes("content")) && (
                        <p className="text-red-500">{errors.find((err) => err.path.includes("content"))?.message}</p>
                    )}
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
                                className={cn(
                                    "w-full justify-start text-left font-normal mt-1",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}
