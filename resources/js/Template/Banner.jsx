import NavLink from '@/Components/NavLink'
import { AnimatePresence,motion } from 'framer-motion'
import React from 'react'
import Breadcrumb from './Breadcrumb'

function Banner({bannerImage, urlArrays}) {
  return (
    <div>
       <AnimatePresence>
            <motion.div className="">
                <div className="relative h-72">
                    <div
                        style={{backgroundImage: `url(${bannerImage})`}}
                        className="h-full bg-cover bg-center bg-no-repeat"
                    >
                        <div className="absolute inset-0 h-full w-full overflow-hidden bg-black/50 bg-fixed">
                            <div className="h-full text-gray-300">
                                <div
                                    className="flex h-full flex-col items-center justify-center px-6 text-center">
                                    <motion.div
                                        className="text-2xl font-bold md:text-3xl lg:text-4xl"
                                        transition={{
                                            type: 'spring',
                                            stiffness: 100,
                                            damping: 20,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            x: -window.innerWidth,
                                            transition: {duration: 0.3},
                                        }}
                                        initial={{
                                            opacity: 0,
                                            x: window.innerWidth,
                                        }}
                                        animate={{x: 0, opacity: 1}}
                                    >
                                        {urlArrays?.[1]?.toUpperCase()}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <Breadcrumb urlArrays={urlArrays} />
                </div>
            </motion.div>
        </AnimatePresence>
    </div>
  )
}

export default Banner
