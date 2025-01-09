import Blogcard from "@/components/cards/blog-card";
import React from "react";
import Search from "@/components/search/search";
import Addbtn from "./components/add-btn";
import Editbtn from "./components/edit-btn";
import Deletebtn from "./components/delete-btn";


export default function Page() {
  const blogData: { title: string; content: string; date: string } = {
    title: "My First Blog Post",
    content: "This is the content of my blog post...",
    date: "19 JAN 2025",
  };
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
        <Addbtn />
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 lg:gap-5 pt-10">
            <div className="relative ">
            <Blogcard
              title={blogData.title}
              content={blogData.content}
              date={blogData.date}
            />
            <div className="absolute text-black  top-[-10%] right-20"><Editbtn /></div>
            <div className="absolute text-black  top-[-10%] right-0"><Deletebtn /></div>
</div>

<div className="relative ">
            <Blogcard
              title={blogData.title}
              content={blogData.content}
              date={blogData.date}
            />
            <div className="absolute text-black  top-[-10%] right-20"><Editbtn /></div>
            <div className="absolute text-black  top-[-10%] right-0"><Deletebtn /></div>
</div>

<div className="relative ">
            <Blogcard
              title={blogData.title}
              content={blogData.content}
              date={blogData.date}
            />
            <div className="absolute text-black  top-[-10%] right-20"><Editbtn /></div>
            <div className="absolute text-black  top-[-10%] right-0"><Deletebtn /></div>
</div>



          </div>
        </div>
      </div>
    </>
  );
}
