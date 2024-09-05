'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { MdKeyboardControlKey } from 'react-icons/md'
import { motion, useAnimation } from 'framer-motion'

const Hero = () => {
  const [animate, setAnimate] = useState(false)
  useEffect(() => {
    // Start the animation after the component mounts
    setAnimate(true)
  }, [])

  return (
    <div className="md:p-5 flex w-full h-full items-center justify-center">
      <div className=" flex flex-col gap-8">
        <motion.p
          className="text text-5xl md:text-7xl lg:text-9xl flex"
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
        <div className="flex flex-col md:flex-row  justify-center gap-16 items-center">
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
          <div className="flex flex-col gap-3">
            <StaggeredText text="Copy" animate={animate} />
            <StaggeredText text="Paste" animate={animate} />
            <AnimateText text="Shine" animatedLetter="i" />
          </div>
          <ImageTransition />
        </div>
      </div>
    </div>
  )
}

export default Hero

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
      className="flex border cursor-pointer border-black rounded-md h-20 text-3xl relative bg-gray-200 shadow-[5px_5px_10px_rgba(0,0,0,0.3),-2px_-2px_5px_rgba(255,255,255,0.8)] hover:shadow-[3px_3px_8px_rgba(0,0,0,0.2),-1px_-1px_3px_rgba(255,255,255,0.6)] active:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.2),inset_-1px_-1px_3px_rgba(255,255,255,0.6)] transition-all duration-200 ease-in-out"
      animate={controls}
      whileTap={{ scale: 0.95 }} // Animate on pressing down
    >
      {icon && <div className="absolute top-2 right-3">{icon}</div>}
      <p className="absolute bottom-2 flex w-full justify-center">{label}</p>
    </motion.div>
  )
}

interface AnimateTextProps {
  text: string
  animatedLetter: string
}

const letterVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

const AnimateText: React.FC<AnimateTextProps> = ({ text, animatedLetter }) => {
  const [isMounted, setIsMounted] = useState(false)
  const controls = useAnimation()
  const letterControls = useAnimation()

  const beforeAnimatedLetter = text.split(animatedLetter)[0]
  const afterAnimatedLetter = text.split(animatedLetter)[1] || ''

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted) {
      controls
        .start({
          opacity: 1,
          x: 0,
          transition: {
            delay: beforeAnimatedLetter.length * 0.1,
          },
        })
        .then(() => {
          letterControls.start({
            rotateY: [0, 360],
            transition: { duration: 1.5, ease: 'linear', repeat: Infinity },
          })
        })
    }
  }, [isMounted, controls, letterControls, beforeAnimatedLetter.length])

  return (
    <div className="relative flex items-center lg:text-7xl text-5xl md:text-6xl">
      <div className="pr-2">
        {beforeAnimatedLetter.split('').map((letter, index) => (
          <motion.span
            key={`before-${index}`}
            initial="hidden"
            animate={controls}
            variants={letterVariants}
            transition={{ delay: index * 0.1 }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="absolute inset-0 flex justify-center items-center"
        initial={{ opacity: 1 }} // Set initial opacity to 1
        animate={letterControls}
        transition={{ duration: 1.5, ease: 'linear' }} // Animation only for rotation
      >
        {animatedLetter}
      </motion.div>

      <div className="pl-2">
        {afterAnimatedLetter.split('').map((letter, index) => (
          <motion.span
            key={`after-${index}`}
            initial="hidden"
            animate={controls}
            variants={letterVariants}
            transition={{
              delay: (beforeAnimatedLetter.length + index) * 0.1 + 1,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

interface StaggeredTextProps {
  text: string
  animate: boolean // Control animation start
}

const staggeredletterVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

const StaggeredText: React.FC<StaggeredTextProps> = ({ text, animate }) => {
  return (
    <div className="flex items-center">
      {text.split('').map((letter, index) => (
        <motion.span
          className="lg:text-7xl text-5xl md:text-6xl"
          key={index}
          initial="hidden"
          animate={animate ? 'visible' : 'hidden'}
          variants={staggeredletterVariants}
          transition={{ delay: index * 0.1 }} // Horizontal staggering effect
        >
          {letter}
        </motion.span>
      ))}
    </div>
  )
}

const ImageTransition = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative w-[300px] h-[300px]  overflow-hidden hidden lg:block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isHovered ? (
        <p className="absolute top-2 right-0">
          Do not come <br /> near me!
        </p>
      ) : (
        <p className="absolute top-2 right-0">
          PURRSS! <br /> Told you!
        </p>
      )}
      {/* First image with animation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: isHovered ? 0 : 1, x: isHovered ? '-100%' : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <Image
          src="/Cat.svg" // Ensure the path is correct and the image is in the public directory
          alt="cat"
          height={550}
          width={300}
          className="absolute inset-0"
        />
      </motion.div>

      {/* Second image with animation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? '0%' : '100%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <Image
          src="/Cat2.svg" // Ensure the path is correct and the image is in the public directory
          alt="cat2"
          height={550}
          width={300}
          className="absolute inset-0"
        />
      </motion.div>
    </div>
  )
}
