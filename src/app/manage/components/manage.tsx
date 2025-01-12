import BlogCard from '@/components/cards/blog-card';
import React from 'react';
import Search from '@/components/search/search';
import DeleteBtn from './delete-btn';
import CreateDialog from '@/components/dialogs/create-dialog';
import EditDialog from '@/components/dialogs/edit-dialog';

export default async function Manage() {
  const data = await fetch('https://677e3ae094bde1c1252affe2.mockapi.io/blogs');
  const blogs = await data.json();

  console.log(blogs);

  return (
    <>
      <div className="flex justify-center">
        <div className="bg-black max-w-[1200px] w-full min-h-[100vh] p-[20px] md:p-[50px]">
          <div className="flex items-center">
            <div className="text-[36px] font-bold text-[#FFFFFF]">
              {' '}
              Manage Blogs
            </div>
          </div>
          <div className="w-[100%] flex justify-end pt-5">
            <Search />
          </div>
          <div className="w-[100%] flex  pt-5">
            <CreateDialog />
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 lg:gap-5 pt-10">
            {blogs.map(
              (blog: {
                id: string;
                title: string;
                content: string;
                date: Date;
              }) => (
                <div key={blog.id} className="relative ">
                  <BlogCard
                    key={blog.id}
                    title={blog.title}
                    content={blog.content}
                    date={new Date(blog.date)}
                  />
                  <div className="flex absolute gap-2 top-[-10%] right-3">
                    <EditDialog
                      id={blog.id}
                      title={blog.title}
                      content={blog.content}
                      date={new Date(blog.date)}
                    />
                    <DeleteBtn id={blog.id} />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
