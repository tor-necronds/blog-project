import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BlogcardProps {
  title: string;
  content: string;
  date: string;
}

export default function Blogcard({ title, content, date }: BlogcardProps) {
  return (
    <>
      <Card className="">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>

        <CardContent>{content}</CardContent>

        <CardFooter className="flex justify-end text-[14px]">{date}</CardFooter>
      </Card>
    </>
  );
}
