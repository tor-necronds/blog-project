"use client";

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
import SaveBtn from "../../../components/buttons/save-btn";
import { updateBlog } from "../../../features/blog/actions";
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

export default function UpdateForm({
  id,
  title,
  content,
  date,
}: EditDialogProps) {
  const [newdate, setNewdate] = useState<Date>();
  const [datepick , setDatepick] = useState<Date>(date);
  const [state, formAction] = useActionState(updateBlog, initialState);

  const data = { id, title, content, date };

  console.log(data);

  return (
    <>
      <form action={formAction}>
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
                    {newdate
      ? format(newdate, "PPP")
      : datepick
      ? format(datepick, "PPP")
      : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newdate}
                    onSelect={setNewdate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Input
                type="hidden"
                name="date"
                value={newdate ? newdate.toISOString() : ""}
              />
            </div>
          </div>
          <div>
            <SaveBtn />
          </div>
        </div>
        {state?.message}
      </form>
    </>
  );
}
