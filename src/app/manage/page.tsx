import Blogcard from "@/components/cards/blog-card"
import React from "react"
import Search from "@/components/search/search"
import Addbtn from "./components/add-btn"
import Editbtn from "./components/edit-btn"
import Deletebtn from "./components/delete-btn"
import CreateDialog from "@/components/dialogs/create-dialog"
/* import BlogForm from "@/components/forms/blog-form"; */

export default async function Page() {
    const data = await fetch("https://677e3ae094bde1c1252affe2.mockapi.io/blogs")
    const blogs = await data.json()

    console.log(blogs)

    return (
        <>
            <div className="flex justify-center">
                <div className="bg-black max-w-[1200px] w-full min-h-[100vh] p-[20px] md:p-[50px]">
                    <div className="flex items-center">
                        <div className="text-[36px] font-bold text-[#FFFFFF]"> Manage Blogs</div>
                    </div>
                    <div className="w-[100%] flex justify-end pt-5">
                        <Search />
                    </div>
                    <div className="w-[100%] flex  pt-5">
                        <CreateDialog />
                    </div>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 lg:gap-5 pt-10">
                        {blogs.map((blog: { id: string; title: string; content: string; date: Date }) => (
                            <div key={blog.id} className="relative ">
                                <Blogcard
                                    key={blog.id}
                                    title={blog.title}
                                    content={blog.content}
                                    date={new Date(blog.date)}
                                />
                                <div className="absolute text-black  top-[-10%] right-20">
                                    <Editbtn />
                                </div>
                                <div className="absolute text-black  top-[-10%] right-0">
                                    <Deletebtn />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/*  <BlogForm /> */}
            </div>
        </>
    )
}
