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
import { updateBlog } from "@/features/blog/actions"
import { useActionState } from "react"
import { blogSchema } from "@/features/blog/schema"
import { z } from "zod"

const initialState = {
    message: "",
    errors: null as z.ZodError | null,
}

interface EditDialogProps {
    id: string
    title: string
    content: string
    date: Date
}

export default function UpdateForm({ id, title, content, date }: EditDialogProps) {
    const [state, formAction] = useActionState(updateBlog, initialState)
    const [datePick, setDatePick] = useState<Date>(date)

    const handleSubmit = async (formData: FormData) => {
        const validationResult = blogSchema.safeParse({
            title: formData.get("title"),
            content: formData.get("content"),
            date: formData.get("date"),
        })

        if (!validationResult.success) {
            state.errors = validationResult.error
            return
        }

        await formAction(formData)

        if (!state.errors) {
            window.location.reload()
        }
    }

    return (
        <form action={handleSubmit}>
            <div className="grid gap-5">
                <div className="grid space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input type="hidden" id="id" name="id" defaultValue={id} />
                        <Input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter title"
                            defaultValue={title}
                            required
                        />
                        {state?.errors?.errors?.find((err) => err.path.includes("title")) && (
                            <p className="text-red-500">
                                {state.errors?.errors?.find((err) => err.path.includes("title"))?.message}
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
                            defaultValue={content}
                            required
                        />
                        {state?.errors?.errors?.find((err) => err.path.includes("content")) && (
                            <p className="text-red-500">
                                {state.errors?.errors?.find((err) => err.path.includes("content"))?.message}
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
                                        !datePick && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {datePick ? format(datePick, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={datePick}
                                    onSelect={(day) => day && setDatePick(day)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <Input type="hidden" name="date" value={datePick ? datePick.toISOString() : ""} />
                        {state?.errors?.errors?.find((err) => err.path.includes("date")) && (
                            <p className="text-red-500">
                                {state.errors?.errors?.find((err) => err.path.includes("date"))?.message}
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <SaveBtn />
                </div>
            </div>
        </form>
    )
}
