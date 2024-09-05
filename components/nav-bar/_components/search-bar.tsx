import React from 'react'

const Searchbar = () => {
  return (
    <div className=" w-full md:w-60 cursor-pointer">
      <span className="bg-neutral-100 border rounded-md px-2 py-1 flex w-full text-slate-500  items-center justify-between ">
        <p className="flex gap-x-2">
          Search <p className="md:block hidden">Documentation...</p>
        </p>
        <span className="uppercase border shadow-sm rounded-md bg-neutral-200 px-1">
          ⌘k
        </span>
      </span>
    </div>
  )
}

export default Searchbar
