'use client'

import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { MdKeyboardControlKey } from 'react-icons/md'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { FaReact } from 'react-icons/fa'
import { RiTailwindCssLine } from 'react-icons/ri'
import Image from 'next/image'

const Hero = () => {
  const [animate, setAnimate] = useState(false)
  useEffect(() => {
    // Start the animation after the component mounts
    setAnimate(true)
  }, [])

  const [headingLoaded, setHeadingLoaded] = useState(false)
  useEffect(() => {
    setInterval(() => {
      setHeadingLoaded(true)
    }, 2500)
  })

  return (
    <div className="p-5 flex w-full h-full items-center justify-center">
      <div className=" flex flex-col items-center justify-center gap-8">
        {/* TOP PART */}
        <StaggeredTextHeadline animate={animate} />

        {/* MIDDLE PART */}
        <div className="flex flex-col md:flex-row  w-full justify-between gap-16 px-16 items-center">
          {/* KEY DESIGN  */}
          {headingLoaded ? (
            <div className="flex flex-col  items-center justify-center gap-10">
              <span className="flex items-center gap-x-6">
                <KeyDesign
                  label="control"
                  icon={<MdKeyboardControlKey />}
                  width="8rem"
                />
                <p className="text-5xl">+</p>
                <KeyDesign label="C" width="5rem" />
              </span>

              <span className="flex items-center gap-x-6">
                <KeyDesign
                  label="control"
                  icon={<MdKeyboardControlKey />}
                  width="8rem"
                />
                <p className="text-5xl">+</p>
                <KeyDesign label="V" width="5rem" />
              </span>
            </div>
          ) : null}
          {/* Folding div*/}
          {headingLoaded ? (
            <div className="hidden md:block">
              <LogoRolodex
                items={[
                  <LogoOrigami key={1} className="bg-white">
                    <FaReact className="fill-sky-400" size={'icon'} />
                  </LogoOrigami>,
                  <LogoOrigami key={2} className="bg-indigo-300 relative">
                    <Image src={'/framer.svg'} alt="framer" fill />
                  </LogoOrigami>,
                  <LogoOrigami key={3} className="bg-neutral-600">
                    <RiTailwindCssLine
                      className="fill-cyan-400"
                      size={'icon'}
                    />
                  </LogoOrigami>,
                ]}
              />
            </div>
          ) : null}
        </div>
        {/* BOTTOM PART */}
        {headingLoaded ? (
          <div className="mt-10 flex flex-col gap-8 ">
            <p className="text-lg w-full text-center">
              Copy, paste and shine. <br className="md:hidden" /> Let us do the
              heavy lifting {':)'}
            </p>
            <div className="flex gap-5 w-full items-center justify-center">
              <button className="text-white bg-black dark:bg-white dark:text-black px-4 py-2 rounded-md border shadow-md w-32">
                Get started
              </button>
              <button className=" px-4 py-2 rounded-md border  w-32">
                Guthub
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Hero

const StaggeredTextHeadline = ({ animate }: { animate: boolean }) => {
  return (
    <motion.p
      className=" w-full text-4xl md:text-7xl lg:text-9xl flex items-center justify-center"
      initial="hidden"
      animate={animate ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ staggerChildren: 0.1 }} // Stagger effect
    >
      {Array.from('Design Made Easy').map((letter, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ delay: index * 0.1 }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.p>
  )
}

interface KeyDesignProps {
  label: string
  icon?: React.ReactNode
  width: string
}

const KeyDesign = ({ label, icon, width }: KeyDesignProps) => {
  const controls = useAnimation()

  useEffect(() => {
    const interval = setInterval(() => {
      controls.start({
        scale: [1, 1.05, 1], // Create a subtle pulsing effect
        transition: { duration: 0.6, ease: 'easeInOut' },
      })
    }, 2000) // Trigger every 2 seconds

    return () => clearInterval(interval)
  }, [controls])

  return (
    <motion.div
      style={{ width }}
      className="flex border cursor-pointer border-black dark:border-white rounded-md h-20 text-3xl relative bg-gray-200 dark:bg-neutral-700 
        shadow-[5px_5px_10px_rgba(0,0,0,0.3),-2px_-2px_5px_rgba(255,255,255,0.8)] 
        dark:shadow-[5px_5px_15px_rgba(255,255,255,0.2),-2px_-2px_5px_rgba(255,255,255,0.1)] 
        hover:shadow-[3px_3px_8px_rgba(0,0,0,0.2),-1px_-1px_3px_rgba(255,255,255,0.6)] 
        dark:hover:shadow-[3px_3px_12px_rgba(255,255,255,0.3),-1px_-1px_6px_rgba(255,255,255,0.15)] 
        active:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.2),inset_-1px_-1px_3px_rgba(255,255,255,0.6)] 
        dark:active:shadow-[inset_3px_3px_8px_rgba(255,255,255,0.2),inset_-1px_-1px_3px_rgba(255,255,255,0.1)] 
        transition-all duration-200 ease-in-out"
      animate={controls}
      whileTap={{ scale: 0.95 }} // Animate on pressing down
    >
      {icon && <div className="absolute top-2 right-3">{icon}</div>}
      <p className="absolute bottom-2 flex w-full justify-center text-black dark:text-white">
        {label}
      </p>
    </motion.div>
  )
}

const LogoRolodex = ({ items }: { items: ReactElement[] }) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [index, setIndex] = useState(0)
  const TRANSITION_DURATION_IN_SECS = 1.5
  const DELAY_IN_MS = 2500

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((pv) => pv + 1)
    }, DELAY_IN_MS)

    return () => {
      clearInterval(intervalRef.current || undefined)
    }
  }, [])

  return (
    <div
      style={{
        transform: 'rotateY(-20deg)',
        transformStyle: 'preserve-3d',
      }}
      className="relative z-0 h-52 w-60 shrink-0 rounded-xl border border-neutral-700 bg-neutral-800"
    >
      <AnimatePresence mode="sync">
        <motion.div
          style={{
            x: '-50%',
            y: '-50%',
            clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%',
            zIndex: -index,
            backfaceVisibility: 'hidden',
          }}
          key={index}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ rotateX: '0deg' }}
          animate={{ rotateX: '0deg' }}
          exit={{ rotateX: '-180deg' }}
          transition={{
            duration: TRANSITION_DURATION_IN_SECS,
            ease: 'easeInOut',
          }}
        >
          {items[index % items.length]}
        </motion.div>
        <motion.div
          style={{
            x: '-50%',
            y: '-50%',
            clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%',
            zIndex: index,
            backfaceVisibility: 'hidden',
          }}
          key={(index + 1) * 2}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ rotateX: '180deg' }}
          animate={{ rotateX: '0deg' }}
          exit={{ rotateX: '0deg' }}
          transition={{
            duration: TRANSITION_DURATION_IN_SECS,
            ease: 'easeInOut',
          }}
        >
          {items[index % items.length]}
        </motion.div>
      </AnimatePresence>
      <hr className="absolute left-0 right-0 top-1/2 z-[9999] -translate-y-1/2 border-t-2 border-neutral-800" />
    </div>
  )
}

const LogoOrigami = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={twMerge(
        'grid h-44 w-52 place-content-center rounded-lg bg-neutral-700 text-6xl text-neutral-50',
        className
      )}
    >
      {children}
    </div>
  )
}
