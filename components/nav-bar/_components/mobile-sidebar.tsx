import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CgChevronLeft } from 'react-icons/cg'
import { navbarItems } from '@/components/constants'
import { motion } from 'framer-motion'
import GlobalLogo from '@/components/global-logo'

interface MobileSidebarProps {
  handleClose: () => void
  isOpen: boolean
}

const MobileSidebar = ({ handleClose, isOpen }: MobileSidebarProps) => {
  return (
    <div className="min-h-screen w-screen fixed top-0 left-0 flex z-[9999] text-foreground">
      {/* Sidebar */}
      <motion.div
        className="w-3/4 md:w-2/4 h-screen bg-white min-w-64  dark:bg-neutral-950 dark:border-r dark:border-slate-800 shadow-md p-3 flex flex-col fixed top-0 left-0"
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? '0%' : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <span
          onClick={handleClose}
          className="absolute top-5 cursor-pointer right-4 border rounded-md shadow-sm p-1"
        >
          <CgChevronLeft size={22} />
        </span>
        <div>
          <MobileSidebarLogo />
          <MobileSideBarContent />
        </div>
      </motion.div>
      {/* Overlay */}
      <motion.div
        onClick={handleClose}
        className={`w-1/4 md:w-2/4 h-screen bg-black fixed top-0 right-0 ${
          isOpen ? 'opacity-70' : 'opacity-0'
        } transition-opacity duration-300`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0.7 : 0 }}
        transition={{ duration: 0.3 }}
      ></motion.div>
    </div>
  )
}
export default MobileSidebar

const MobileSidebarLogo = () => {
  return (
    <Link href={'/'} className="h-full w-full">
      <span className="flex items-center space-x-2">
        <GlobalLogo />
        <p className="font-extrabold text-lg "> Neko UI</p>
      </span>
    </Link>
  )
}

const MobileSideBarContent = () => {
  return (
    <div className="pl-8 pt-8">
      <div className="flex flex-col gap-3">
        {navbarItems.map((item) => (
          <Link href={item.link} key={item.id}>
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
