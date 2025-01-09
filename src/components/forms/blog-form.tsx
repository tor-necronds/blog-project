"use client"

import React,{useState} from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import SaveBtn from "../buttons/save-btn"

export default function BlogForm() {
    const [date, setDate] = useState<Date>()

    
    return (
        <form>
            <div className="grid gap-5">
                <div className="grid space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input type="text" id="title" placeholder="Enter title" required />
                    </div>
                </div>
                <div className="grid space-y-4">
                    <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea id="content" placeholder="Enter content" required />
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
                <div>
                    <SaveBtn />
                </div>
            </div>
        </form>
    )
  }




