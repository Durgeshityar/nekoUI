import React from 'react'

import { navbarItems } from '@/components/constants'
import Link from 'next/link'

const NavbarItems = () => {
  return (
    <>
      {navbarItems.map((item) => (
        <Link
          href={item.link}
          className="text-foreground opacity-50 px-1 hidden md:block"
          key={item.id}
        >
          {item.title}
        </Link>
      ))}
    </>
  )
}

export default NavbarItems
