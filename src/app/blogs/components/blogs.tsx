'use client';

import React, { useState } from 'react';
import BlogCard from '@/components/cards/blog-card';
import Dropdown from '@/components/dropdown/dropdown';
import Counting from '../components/counting';
import BlogDetail from './blog-detail';
import useSWR from 'swr';
import { Input } from '@/components/ui/input';
import { useQueryState } from 'nuqs';

export default function Blogs() {
  const [search, setSearch] = useQueryState<string>('search', {
    defaultValue: '',
    parse: (value) => value || '',
    serialize: (value) => value,
  });
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string>('');
  const [sort, setSort] = useState<string>('new');
  const { data, error, isLoading } = useSWR(
    'https://677e3ae094bde1c1252affe2.mockapi.io/blogs'
  );

  if (isLoading) {
    return null;
  }

  if (error) {
    return null;
  }

  const filteredData = data.filter(
    (blog: { title: string; content: string }) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.content.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenDetail = (id: string) => {
    setOpenDetail(true);
    setSelectedBlogId(id);
  };

  const sortedData = filteredData.sort(
    (a: { date: string }, b: { date: string }) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sort === 'new'
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    }
  );

  console.log(data.length);
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="bg-black max-w-[1200px] w-full min-h-[100vh] p-[20px] md:p-[50px]">
          <div className="flex items-center justify-between">
            <div className="text-[36px] font-bold text-[#FFFFFF]">Blogs</div>
            <Counting data={sortedData.length} />
          </div>
          <div className="w-[100%] flex justify-end pt-5">
            <Input
              value={search || ''}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or content..."
              className="text-[#FFFFFF]"
            />
          </div>
          <div className="w-[100%] flex justify-end pt-5">
            <Dropdown onSortChange={setSort} />
          </div>

          {data.length === 0 ? (
            <p className="text-[#FFFFFF] text-center mt-10">ไม่มีข้อมูล</p>
          ) : filteredData.length === 0 ? (
            <p className="text-[#FFFFFF] text-center mt-10">
              ไม่มีคำค้นหา &quot;{search}&quot; ที่คุณต้องการ
            </p>
          ) : (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 pt-10">
              {filteredData.map(
                (blog: {
                  id: string;
                  title: string;
                  content: string;
                  date: string;
                }) => (
                  <div
                    key={blog.id}
                    onClick={() => handleOpenDetail(blog.id)}
                    className="cursor-pointer"
                  >
                    <BlogCard
                      key={blog.id}
                      title={blog.title}
                      content={blog.content}
                      date={new Date(blog.date)}
                    />
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
      <BlogDetail
        isOpen={openDetail}
        blogId={selectedBlogId}
        onClose={() => setOpenDetail(false)}
      />
    </>
  );
}
