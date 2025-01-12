'use client'

import { useQueryState } from 'nuqs'
import BlogCard from '@/components/cards/blog-card'
import Search from '@/components/search/search'
import DeleteBtn from './delete-btn'
import CreateDialog from '@/components/dialogs/create-dialog'
import EditDialog from '@/components/dialogs/edit-dialog'
import useSWR from 'swr'

export default function ManageClient() {
  const [search, setSearch] = useQueryState('search')
  const { data, error, isLoading } = useSWR(
    'https://677e3ae094bde1c1252affe2.mockapi.io/blogs'
  )

  if (isLoading) {
    return null
  }

  if (error) {
    return null
  }

  const filteredBlogs = data.filter(
    (blog: { title: string; content: string }) =>
      blog.title.toLowerCase().includes(search?.toLowerCase() || '') ||
      blog.content.toLowerCase().includes(search?.toLowerCase() || '')
  )

  return (
    <div className="flex justify-center">
      <div className="bg-black max-w-full w-full min-h-[100vh] p-[20px] md:p-[50px]">
        <div className="flex items-center">
          <div className="text-[36px] font-bold text-[#FFFFFF]">
            Manage Blogs
          </div>
        </div>

        <div className="w-[100%] flex justify-end pt-5">
          <Search
            value={search || ''}
            onChange={(e) => setSearch(e.target.value || null)}
          />
        </div>

        <div className="w-[100%] flex pt-5">
          <CreateDialog />
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:gap-6 pt-10">
          {filteredBlogs.map(
            (blog: {
              id: string
              title: string
              content: string
              date: string
            }) => (
              <div
                key={blog.id}
                className="relative hover:-translate-y-1 duration-300"
              >
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
  )
}
