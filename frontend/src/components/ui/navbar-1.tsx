"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { ButtonCta } from "@/components/ui/button-shiny"
import { useAuth } from "@/context/AuthContext"

const Navbar1 = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { theme, setTheme } = useTheme()
    const { user, logout } = useAuth()

    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <div className="fixed top-0 left-0 right-0 flex justify-center w-full py-6 px-4 z-50 pointer-events-none">
            <div className="flex items-center justify-between px-6 py-2 bg-background/50 backdrop-blur-xl border border-primary/10 rounded-md shadow-2xl w-full max-w-4xl relative z-10 pointer-events-auto">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: -10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="h-8 w-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5" />
                                <path d="M2 12l10 5 10-5" />
                            </svg>
                        </motion.div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground/80 group-hover:text-foreground transition-colors hidden sm:block">Brainstorm</span>
                    </Link>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    {user ? (
                        <>
                            <div className="hidden sm:block text-[10px] text-muted-foreground font-medium uppercase tracking-widest mr-2">
                                {user.email}
                            </div>
                            <ButtonCta 
                                label="Logout" 
                                showBorder={false} 
                                className="w-auto h-9 px-4 text-[10px] uppercase tracking-wider font-bold bg-zinc-950/20" 
                                onClick={logout}
                            />
                            <motion.div
                                className="hidden md:block"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Link href="/create">
                                    <ButtonCta label="+ New Note" showBorder={false} className="w-auto h-9 px-5 text-[10px] uppercase tracking-wider font-bold" />
                                </Link>
                            </motion.div>
                        </>
                    ) : (
                        <Link href="/login">
                            <ButtonCta label="Login" showBorder={false} className="w-auto h-9 px-6 text-[10px] uppercase tracking-wider font-bold" />
                        </Link>
                    )}

                    {/* Mobile Menu Button */}
                    <motion.button className="md:hidden flex items-center p-2 text-muted-foreground" onClick={toggleMenu} whileTap={{ scale: 0.9 }}>
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-40 pt-28 px-8 md:hidden pointer-events-auto"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export { Navbar1 }
