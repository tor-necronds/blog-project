import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "../../utils/format-date";
interface BlogcardProps {
  key: string;
  title: string;
  content: string;
  date: Date;
}

export default function Blogcard({ title, content, date }: BlogcardProps) {
  const formattedDate = formatDate(date);
  return (
    <>
      <Card className="min-w-[300px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>

        <CardContent>{content}</CardContent>

        <CardFooter className="flex justify-end text-[14px]">
          {formattedDate}
        </CardFooter>
      </Card>
    </>
  );
}
