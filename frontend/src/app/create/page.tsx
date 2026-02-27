"use client";

import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import { NoteForm } from "@/components/NoteForm";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function CreateNotePage() {
    const router = useRouter();
    const { user, token, loading: authLoading } = useAuth();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [user, authLoading, router]);

    const handleCreate = async (title: string, content: string) => {
        try {
            await createNote({ title, content }, token || undefined);
            toast.success("Note created successfully.");
            setTimeout(() => {
                router.push("/");
            }, 800);
        } catch (error) {
            toast.error("Failed to save note.");
        }
    };

    return (
        <main className="container mx-auto px-4 pt-28 pb-20 max-w-2xl">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-10"
            >
                <div className="space-y-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back
                    </Link>

                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-black tracking-tighter">
                            New Note
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Capture your thoughts and let AI help you organize them.
                        </p>
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="p-6 md:p-8 rounded-2xl border border-primary/10 bg-card/40"
                >
                    <NoteForm
                        onSubmit={handleCreate}
                        submitLabel="Create Note"
                    />
                </motion.div>
            </motion.div>

            <Toaster richColors position="top-right" theme="dark" />
        </main>
    );
}
