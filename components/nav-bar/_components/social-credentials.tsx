import React from 'react'
import { BsGithub, BsTwitterX } from 'react-icons/bs'

const socialHandles = [
  { id: 1, icon: BsGithub, link: 'https://github.com', size: 16 },
  { id: 2, icon: BsTwitterX, link: 'https://twitter.com', size: 16 },
]

const SocialHandle = () => {
  return (
    <div className="flex items-center gap-x-3">
      {socialHandles.map((handle) => {
        const IconComponent = handle.icon
        return (
          <a
            key={handle.id}
            href={handle.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconComponent size={handle.size} />
          </a>
        )
      })}
    </div>
  )
}

export default SocialHandle
