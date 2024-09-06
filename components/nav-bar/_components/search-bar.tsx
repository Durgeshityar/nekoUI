import React from 'react'

const Searchbar = () => {
  return (
    <div className="md:w-60 w-full min-w-60 cursor-pointer">
      <span className="bg-neutral-100 dark:bg-neutral-700 text-foreground border dark:border-zinc-500 rounded-md px-2 py-1 flex w-full opacity-50 items-center justify-between ">
        <p className="flex gap-x-2">
          Search <p className="md:block hidden">Documentation...</p>
        </p>
        <span className="uppercase border shadow-sm rounded-md bg-neutral-200  dark:bg-neutral-500 px-1">
          ⌘k
        </span>
      </span>
    </div>
  )
}

export default Searchbar
