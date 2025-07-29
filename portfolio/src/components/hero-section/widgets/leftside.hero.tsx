import { slideInFromLeft } from '@/utils/motions/montion'
import { motion } from 'framer-motion'
import React from 'react'
import { FaGithub } from 'react-icons/fa'

export default function LeftSideHero() {
    return (
        <div className="w-full lg:w-1/2 flex flex-col gap-5 sm:gap-8 lg:gap-10 z-20 px-4 sm:px-6 lg:px-8">

            {/* Main Content */}
            <motion.div
                variants={slideInFromLeft(0.8)}
                className="space-y-3 sm:space-y-4"
            >
                {/* Name & Title */}
                <div className="space-y-3 sm:space-y-4">
                    <div className="inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-mono overflow-x-auto whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-green-400">~/</span>
                        <span className="text-purple-400">$</span>
                        <span className="text-purple-400">class</span>
                        <span className="text-cyan-400">𝙳𝚎𝚟𝚎𝚕𝚘𝚙𝚎𝚛</span>
                        <span className="text-purple-400">extends</span>
                        <span className="text-orange-400">𝙴𝚗𝚐𝚒𝚗𝚎𝚎𝚛</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                        <span className="text-gray-400/90 text-2xl sm:text-3xl">I'm </span>
                        <span className="opacity-80">
                            Sahil Goswami
                        </span>
                    </h1>
                </div>
                {/* About Section */}
                <div className="space-y-4 sm:space-y-6 font-mono text-sm sm:text-base">
                    {/* Function Declaration */}
                    <div className="space-y-2">
                        <div className="text-xs sm:text-sm text-gray-400">// Let me introduce myself...</div>
                        <div className="space-y-1">
                            <div className="text-sm sm:text-base">
                                <span className="text-purple-500">async function</span>
                                <span className="text-cyan-500"> get𝚂𝚊𝚑𝚒𝚕𝙿𝚛𝚘𝚏𝚒𝚕𝚎</span>
                                <span className="text-gray-300">() {`{`}</span>
                            </div>
                            <div className="pl-2 sm:pl-4 space-y-2">
                                <div>
                                    <span className="text-purple-500">const</span>
                                    <span className="text-cyan-500"> 𝚍𝚎𝚟𝚎𝚕𝚘𝚙𝚎𝚛</span>
                                    <span className="text-gray-300"> = {`{`}</span>
                                </div>
                                <div className="pl-2 sm:pl-4 space-y-1">
                                    <div className="break-words">
                                        <span className="text-emerald-400">title:</span>
                                        <span className="text-amber-400"> "𝙳𝚊𝚝𝚊 𝚂𝚌𝚒𝚎𝚗𝚝𝚒𝚜𝚝 | 𝙵𝚞𝚕𝚕 𝚂𝚝𝚊𝚌𝚔 𝙳𝚎𝚟𝚎𝚕𝚘𝚙𝚎𝚛"</span>,
                                    </div>
                                    <div>
                                        <span className="text-emerald-400">specialization:</span>
                                        <span className="text-gray-300"> {`{`}</span>
                                    </div>
                                    <div className="pl-2 sm:pl-4">
                                        <span className="text-emerald-400">webDev:</span>
                                        <span className="text-pink-400"> "𝙵𝚞𝚕𝚕 𝚂𝚝𝚊𝚌𝚔 𝚆𝚎𝚋 𝙳𝚎𝚟𝚎𝚕𝚘𝚙𝚖𝚎𝚗𝚝"</span>,
                                    </div>
                                    <div className="pl-2 sm:pl-4">
                                        <span className="text-emerald-400">dataScience:</span>
                                        <span className="text-blue-400"> "𝙳𝚊𝚝𝚊 𝚂𝚌𝚒𝚎𝚗𝚌𝚎"</span>,
                                    </div>
                                    <span className="text-gray-300"> {`}`}</span>
                                    <div className="break-words">
                                        <span className="text-emerald-400">interests:</span>
                                        <span className="text-orange-400"> ["𝙰𝙸/𝙼𝙻 𝙳𝚎𝚟𝚎𝚕𝚘𝚙𝚖𝚎𝚗𝚝"],</span>
                                    </div>
                                    <div className="break-words">
                                        <span className="text-emerald-400">status:</span>
                                        <span className="text-orange-400"> "𝙻𝚊𝚣𝚢 𝚋𝚢 𝚍𝚎𝚏𝚊𝚞𝚕𝚝, 𝚌𝚘𝚍𝚒𝚗𝚐 𝚒𝚜 𝚍𝚛𝚒𝚟𝚒𝚗𝚐 𝚖𝚎.𝚜𝚕𝚎𝚎𝚙( ) 😵‍💫"</span>
                                    </div>
                                </div>
                                <div className="text-gray-300">{`}`};</div>
                                <div>
                                    <span className="text-purple-500">return</span>
                                    <span className="text-cyan-500"> 𝚍𝚎𝚟𝚎𝚕𝚘𝚙𝚎𝚛</span>;
                                </div>
                            </div>
                            <div className="text-gray-300">{`}`}</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Actions */}
            <motion.div
                variants={slideInFromLeft(1.2)}
                className="flex flex-col gap-4 sm:gap-5 relative"
            >
                {/* Divider */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

                {/* Primary Actions */}
                <div className="flex items-center justify-center">
                    {/* GitHub Button */}
                    <motion.a
                        href="https://github.com/styxgzi"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative overflow-hidden group"
                    >
                        <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3
                        bg-gray-900/40 backdrop-blur-md rounded-lg
                        border border-white/5 group-hover:border-purple-500/30
                        shadow-[0_4px_20px_-4px_rgba(128,90,213,0.3)] group-hover:shadow-[0_8px_25px_-5px_rgba(128,90,213,0.5)]
                        transition-all duration-300 ease-out"
                        >
                            <FaGithub className="text-lg sm:text-xl text-white group-hover:text-purple-400 transition-colors" />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">GitHub</span>
                                <span className="text-xs text-gray-400">@styxgzi</span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        </div>
                    </motion.a>
                </div>

            </motion.div>
        </div>
    )
}
