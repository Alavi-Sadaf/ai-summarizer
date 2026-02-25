"use client";

import Link from "next/link";
import { Plus, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function Navbar() {
    const { theme, setTheme } = useTheme();

    return (
        <header className="fixed top-0 z-50 w-full backdrop-blur-xl bg-background/50 border-b border-primary/5">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <motion.div 
                        whileHover={{ scale: 1.1, rotate: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="h-8 w-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center"
                    >
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                        </svg>
                    </motion.div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground/80 group-hover:text-foreground transition-colors">Brainstorm</span>
                </Link>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="relative text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5 h-8 w-8 flex items-center justify-center"
                    >
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute" />
                        <Moon className="h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute" />
                    </button>

                    <Link href="/create" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-primary-foreground bg-primary hover:bg-primary/85 px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-primary/25">
                       <Plus className="h-3.5 w-3.5" />
                       <span>New Note</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
