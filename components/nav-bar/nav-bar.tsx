'use client'

import React, { useEffect, useState } from 'react'
import Searchbar from './_components/search-bar'
import SocialHandle from './_components/social-credentials'
import Theme from './_components/theme'
import NavbarItems from './_components/nabarItems'
import Logo from './_components/logo'

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // use client -> causes render both on server and client -> mismatch of renders causes hydratin error
  // prevents hydrartion error
  if (!isMounted) {
    return null
  }

  return (
    <div className="h-12 w-full flex items-center p-2  justify-between m-2 px-4">
      <div className="flex items-center gap-x-3">
        <Logo />
        <NavbarItems />
      </div>
      <div className="flex flex-grow  md:flex-grow-0 items-center gap-x-5 md:w-auto">
        <Searchbar />
        <div className="flex items-center gap-x-5">
          <SocialHandle />
          <Theme />
        </div>
      </div>
    </div>
  )
}

export default Navbar
