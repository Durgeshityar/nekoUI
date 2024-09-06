import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'

import MobileSidebar from './mobile-sidebar'
import GlobalLogo from '@/components/global-logo'

const Logo = () => {
  const [sidebar, openSidebar] = useState(false)
  const toggleSidebar = () => {
    openSidebar(!sidebar)
  }

  return (
    <>
      <span className="md:hidden mr-3" onClick={toggleSidebar}>
        <RxHamburgerMenu size={18} />
      </span>
      {sidebar ? (
        <MobileSidebar isOpen={sidebar} handleClose={toggleSidebar} />
      ) : null}
      <Link href={'/'} className="h-full w-full hidden md:block">
        <span className="flex items-center space-x-2">
          <div className="text-black dark:text-white">
            <GlobalLogo />
          </div>
          <p className="font-extrabold text-lg hidden lg:block"> Neko UI</p>
        </span>
      </Link>
    </>
  )
}

export default Logo
