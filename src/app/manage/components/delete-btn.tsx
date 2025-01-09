
"use client"

import { deleteBlog } from "../../../features/blog/actions"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useActionState } from "react";


const initialState = {
  message: "",
};

interface EditDialogProps {
  id: string;
  title: string;
  content: string;
  date: Date;
}


export default function Deletebtn({
  id,
  title,
  content,
  date,
}: EditDialogProps) {
  const [datepick, setDatepick] = useState<Date>();
const [state, formAction] = useActionState(deleteBlog, initialState);
  return (
    <>
   <form action={formAction}>
          <div className="grid gap-5 hidden">
             <Input type="hidden" id="id" name="id" defaultValue={id} />
            <div className="grid space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input type="hidden" id="id" name="id" defaultValue={id} />
                <Input
                  type=""
                  id="title"
                  name="title"
                  placeholder="Enter title"
                  defaultValue={title}
                  required
                />
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
                    <Calendar
                      mode="single"
                      selected={datepick}
                      onSelect={setDatepick}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="hidden"
                  name="date"
                  value={datepick ? datepick.toISOString() : ""}
                />
              </div>
            </div>
            <div>

            </div>
          </div>
          <Button  className="bg-red-500" type="submit" >Delete</Button>
          {state?.message}
        </form>

    </>
  )
}
