'use client'

import Separator from '@/components/seperator'
import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { useTheme } from 'next-themes'

type ThemeType = 'light' | 'dark'

const Theme = () => {
  const [theme, setTheme] = useState<ThemeType>('light')
  const [open, setOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const { setTheme: setThemeFromSystem } = useTheme()

  const handleLight = () => {
    setTheme('light')
    setThemeFromSystem('light')
    setOpen(false)
  }
  const handleDark = () => {
    setTheme('dark')
    setThemeFromSystem('dark')
    setOpen(false)
  }

  // Close the modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative">
      <div className="cursor-pointer " onClick={() => setOpen((prev) => !prev)}>
        {theme === 'light' ? (
          <MdOutlineLightMode size={22} />
        ) : (
          <MdOutlineDarkMode size={22} />
        )}
      </div>
      {open ? (
        <div
          ref={modalRef}
          className="absolute top-10 right-2 border rounded-md bg-white dark:bg-neutral-700  dark:border-zinc-500 cursor-pointer flex flex-col justify-center gap-1 shadow-md w-36 text-slate-600 dark:text-slate-300"
        >
          <p
            onClick={handleLight}
            className="p-2 hover:bg-slate-100 dark:hover:bg-neutral-600 w-full h-full"
          >
            Light
          </p>
          <Separator />
          <p
            onClick={handleDark}
            className="p-2 hover:bg-slate-100 dark:hover:bg-neutral-600 w-full h-full"
          >
            Dark
          </p>
        </div>
      ) : null}
    </div>
  )
}

export default Theme
