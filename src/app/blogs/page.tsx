import BlogCard from "@/components/cards/blog-card"
import React from "react"
import Dropdown from "@/components/dropdown/dropdown"
import Counting from "./components/counting"

export default async function Page() {
    const data = await fetch("https://677e3ae094bde1c1252affe2.mockapi.io/blogs")
    const blogs = await data.json()

    console.log(blogs)

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
                        {blogs.map((blog: { id: string; title: string; content: string; date: Date }) => (
                            <BlogCard
                                key={blog.id}
                                title={blog.title}
                                content={blog.content}
                                date={new Date(blog.date)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
