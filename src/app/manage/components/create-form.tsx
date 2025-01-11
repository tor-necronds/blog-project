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

type TouchedFields = {
    title: boolean
    content: boolean
    date: boolean
}

export default function CreateForm() {
    const [state, formAction] = useActionState(createBlog, initialState)
    const [clientErrors, setClientErrors] = useState<z.ZodError | null>(null)
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [date, setDate] = useState<Date>()
    const [touched, setTouched] = useState<TouchedFields>({
        title: false,
        content: false,
        date: false,
    })

    const validateField = (field: keyof TouchedFields, value: any) => {
        const dataToValidate = {
            title: field === "title" ? value : title,
            content: field === "content" ? value : content,
            date: field === "date" ? (value ? value.toISOString() : "") : date ? date.toISOString() : "",
        }

        const validationResult = blogSchema.safeParse(dataToValidate)

        if (!validationResult.success) {
            const fieldError = validationResult.error.errors.find((err) => err.path.includes(field))
            if (fieldError) {
                setClientErrors(validationResult.error)
            } else {
                const newErrors = clientErrors?.errors.filter((err) => !err.path.includes(field))
                if (newErrors?.length === 0) {
                    setClientErrors(null)
                } else if (newErrors) {
                    setClientErrors(new z.ZodError(newErrors))
                }
            }
        } else if (touched[field]) {
            const newErrors = clientErrors?.errors.filter((err) => !err.path.includes(field))
            if (newErrors?.length === 0) {
                setClientErrors(null)
            } else if (newErrors) {
                setClientErrors(new z.ZodError(newErrors))
            }
        }
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setTitle(newValue)
        if (touched.title) {
            validateField("title", newValue)
        }
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value
        setContent(newValue)
        if (touched.content) {
            validateField("content", newValue)
        }
    }

    const handleDateSelect = (newDate: Date | undefined) => {
        setDate(newDate)
        if (touched.date) {
            validateField("date", newDate)
        }
    }

    const handleBlur = (field: keyof TouchedFields) => {
        setTouched((prev) => ({ ...prev, [field]: true }))
        validateField(field, field === "title" ? title : field === "content" ? content : date)
    }

    const handleSubmit = async (formData: FormData) => {
        const validationResult = blogSchema.safeParse({
            title: title,
            content: content,
            date: date ? date.toISOString() : "",
        })

        if (!validationResult.success) {
            setClientErrors(validationResult.error)
            setTouched({ title: true, content: true, date: true })
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
                                onChange={handleTitleChange}
                                onBlur={() => handleBlur("title")}
                            />
                            {touched.title && clientErrors?.errors?.find((err) => err.path.includes("title")) && (
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
                                onChange={handleContentChange}
                                onBlur={() => handleBlur("content")}
                            />
                            {touched.content && clientErrors?.errors?.find((err) => err.path.includes("content")) && (
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
                                        onBlur={() => handleBlur("date")}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
                                </PopoverContent>
                            </Popover>
                            <Input type="hidden" name="title" value={title} />
                            <Input type="hidden" name="content" value={content} />
                            <Input type="hidden" name="date" value={date ? date.toISOString() : ""} />
                            {touched.date && clientErrors?.errors?.find((err) => err.path.includes("date")) && (
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
