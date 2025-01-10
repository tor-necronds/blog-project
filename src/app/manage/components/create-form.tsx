"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import SaveBtn from "@/components/buttons/save-btn"
import { createBlog } from "@/features/blog/actions"
import { useActionState } from "react"
import { blogSchema } from "@/features/blog/schema"
import { z } from "zod"

const initialState = {
    message: "",
    errors: null as z.ZodError | null,
}

export default function CreateForm() {
    const [state, formAction] = useActionState(createBlog, initialState)
    const [clientErrors, setClientErrors] = useState<z.ZodError | null>(null)
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [date, setDate] = useState<Date>()

    const handleSubmit = async (formData: FormData) => {
        const validationResult = blogSchema.safeParse({
            title: title,
            content: content,
            date: date ? date.toISOString() : "",
        })

        if (!validationResult.success) {
            setClientErrors(validationResult.error)
            return
        }

        setClientErrors(null)

        await formAction(formData)

        if (!state.errors) {
            window.location.reload()
        }
    }

    return (
        <>
            <form action={handleSubmit}>
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
                            {clientErrors?.errors?.find((err) => err.path.includes("title")) && (
                                <p className="text-red-500">
                                    {clientErrors.errors?.find((err) => err.path.includes("title"))?.message}
                                </p>
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
                            {clientErrors?.errors?.find((err) => err.path.includes("content")) && (
                                <p className="text-red-500">
                                    {clientErrors.errors?.find((err) => err.path.includes("content"))?.message}
                                </p>
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
                            <Input type="hidden" name="title" value={title} />
                            <Input type="hidden" name="content" value={content} />
                            <Input type="hidden" name="date" value={date ? date.toISOString() : ""} />
                            {clientErrors?.errors?.find((err) => err.path.includes("date")) && (
                                <p className="text-red-500">
                                    {clientErrors.errors?.find((err) => err.path.includes("date"))?.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <SaveBtn />
                    </div>
                </div>
            </form>
        </>
    )
}
