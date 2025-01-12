import React from 'react'
import Link from 'next/link'
export default function Navbar() {
  return (
    <>
      <nav className="flex items-center justify-center sticky top-0">
        <div className="grid grid-cols-2 max-w-full bg-black w-full text-white">
          <div className="border border-slate-100 flex justify-center h-[50px] items-center cursor-pointer hover:bg-slate-100 hover:text-black">
            <Link href={`/blogs`} className="w-[100%] flex justify-center">
              Home
            </Link>
          </div>
          <div className="border border-slate-100 flex justify-center items-center cursor-pointer hover:bg-slate-100 hover:text-black">
            <Link href={`/manage`} className="w-[100%] flex justify-center">
              Manage
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
