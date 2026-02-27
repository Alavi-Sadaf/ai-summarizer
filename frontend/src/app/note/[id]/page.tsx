"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getNote, deleteNote, summarizeNote, Note } from "@/lib/api";
import { SummaryBox } from "@/components/SummaryBox";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { ArrowLeft, Trash2, Sparkles, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function NoteDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user, token, loading: authLoading } = useAuth();
    const [note, setNote] = useState<Note | null>(null);
    const [loading, setLoading] = useState(true);
    const [summarizing, setSummarizing] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        } else if (user && id) {
            fetchNote();
        }
    }, [id, user, authLoading, router]);

    const fetchNote = async () => {
        try {
            setLoading(true);
            const data = await getNote(id as string, token || undefined);
            setNote(data);
        } catch (error) {
            toast.error("Failed to load note.");
            router.push("/");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteNote(id as string, token || undefined);
            toast.success("Note deleted.");
            router.push("/");
        } catch (error) {
            toast.error("Failed to delete note.");
        }
    };

    const handleSummarize = async () => {
        try {
            setSummarizing(true);
            const updatedNote = await summarizeNote(id as string, token || undefined);
            setNote(updatedNote);
            toast.success("Summary generated!");
        } catch (error) {
            toast.error("Summarization failed.");
        } finally {
            setSummarizing(false);
        }
    };

    if (loading) return <main className="container mx-auto px-4 pt-28"><Loader /></main>;
    if (!note) return null;

    return (
        <main className="container mx-auto px-4 pt-28 pb-20 max-w-3xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Top bar */}
                <div className="flex items-center justify-between mb-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back
                    </Link>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground/60 hover:text-destructive hover:bg-destructive/5 rounded-lg px-3 h-8 gap-1.5 text-xs font-medium transition-all"
                        onClick={handleDelete}
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                    </Button>
                </div>

                {/* Article */}
                <div className="space-y-10">
                    {/* Header */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground/50 uppercase tracking-wider">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(new Date(note.created_at), { addSuffix: true })}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.05]">
                            {note.title}
                        </h1>
                    </div>

                    {/* Summary */}
                    <SummaryBox 
                        summary={note.summary} 
                        onGenerate={handleSummarize} 
                        isGenerating={summarizing} 
                    />

                    {/* Content */}
                    <div className="relative p-6 md:p-8 rounded-2xl bg-card/40 border border-primary/5">
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                            <Sparkles className="h-20 w-20 text-primary" />
                        </div>
                        <div className="text-base md:text-lg leading-[1.8] text-foreground/85 whitespace-pre-wrap relative z-10">
                            {note.content}
                        </div>
                    </div>
                </div>
            </motion.div>

            <Toaster richColors position="top-right" theme="dark" />
        </main>
    );
}
