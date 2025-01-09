import Blogcard from "@/components/cards/blog-card"
import React from "react"
import Dropdown from "@/components/dropdown/dropdown"
import Counting from "./components/counting"

export default function Page() {
    const blogData: { title: string; content: string; date: string } = {
        title: "My First Blog Post",
        content: "This is the content of my blog post...",
        date: "19 JAN 2025",
    }
    return (
        <>
            <div className="flex justify-center">
                <div className="bg-black max-w-[1200px] w-full min-h-[100vh] p-[20px] md:p-[50px]">
                    <div className="flex items-center justify-between">
                        <div className="text-[36px] font-bold text-[#FFFFFF]">Blogs</div>
                        <Counting />
                    </div>

                    <div className="w-[100%] flex justify-end pt-5">
                        <Dropdown />
                    </div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 pt-10">
                        <Blogcard title={blogData.title} content={blogData.content} date={blogData.date} />

                        <Blogcard title={blogData.title} content={blogData.content} date={blogData.date} />

                        <Blogcard title={blogData.title} content={blogData.content} date={blogData.date} />

                        <Blogcard title={blogData.title} content={blogData.content} date={blogData.date} />

                        <Blogcard title={blogData.title} content={blogData.content} date={blogData.date} />

                        <Blogcard title={blogData.title} content={blogData.content} date={blogData.date} />
                    </div>
                </div>
            </div>
        </>
    )
}
