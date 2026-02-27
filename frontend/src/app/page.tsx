"use client";

import { useEffect, useState } from "react";
import { getNotes, deleteNote, summarizeNote, Note } from "@/lib/api";
import { NoteCard } from "@/components/NoteCard";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { SkeletonLoader } from "@/components/Loader";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { ButtonCta } from "@/components/ui/button-shiny";
import CurvedLoop from "@/components/CurvedLoop";
import GradientText from "@/components/GradientText";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Aurora = dynamic(() => import("@/components/Aurora"), { ssr: false });

export default function Home() {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [summarizingId, setSummarizingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    } else if (user) {
      fetchNotes();
    }
  }, [user, authLoading]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes(token || undefined);
      setNotes(data);
    } catch (error) {
      toast.error("Failed to load notes.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await deleteNote(id, token || undefined);
      setNotes(notes.filter((n) => n.id !== id));
      toast.success("Note deleted.");
    } catch (error) {
      toast.error("Failed to delete.");
    }
  };

  const handleSummarize = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setSummarizingId(id);
      const updatedNote = await summarizeNote(id, token || undefined);
      setNotes(notes.map((n) => (n.id === id ? updatedNote : n)));
      toast.success("Summary generated.");
    } catch (error) {
      toast.error("Summarization failed.");
    } finally {
      setSummarizingId(null);
    }
  };

  if (authLoading || (!user && !authLoading)) {
    return <SkeletonLoader />;
  }

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Aurora background — fixed, behind everything */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Aurora
          colorStops={["#3b0764", "#7c3aed", "#4c1d95"]}
          amplitude={1.2}
          speed={0.5}
        />
        {/* Fade aurora into background at the bottom */}
        <div
          style={{ position: "absolute", inset: 0 }}
          className="bg-gradient-to-b from-transparent via-background/50 to-background"
        />
      </div>

      <main
        className="container mx-auto px-4 pt-28 pb-0 relative"
        style={{ zIndex: 1 }}
      >
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 space-y-6"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-semibold uppercase tracking-[0.2em]"
          >
            AI-Powered Notes
          </motion.span>

          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.95] flex flex-wrap justify-center items-center gap-x-4">
            Your 
            <GradientText
              className="italic font-black"
              colors={["#7c3aed", "#a78bfa", "#c4b5fd", "#7c3aed"]}
              animationSpeed={3}
              showBorder={false}
            >
              Second
            </GradientText> 
            Brain
          </h1>

          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Capture thoughts, summarize with AI, and build your knowledge base.
          </p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-xl mx-auto mt-10"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
            <Input
              placeholder="Search your notes..."
              className="pl-14 h-14 text-base glass-input border-none placeholder:text-muted-foreground/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
        </motion.div>

        {/* Content */}
        {loading ? (
          <SkeletonLoader />
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredNotes.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filteredNotes.map((note, i) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onDelete={handleDelete}
                    onSummarize={handleSummarize}
                    isSummarizing={summarizingId === note.id}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center space-y-8 border-none rounded-3xl liquid-glass"
              >
                <div className="h-20 w-20 rounded-2xl bg-primary/10 border border-dashed border-primary/20 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary/60 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight">No notes yet</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Start capturing your thoughts and let AI help you make sense of them.
                  </p>
                </div>
                <Link href="/create">
                  <ButtonCta label="✦ Create your first note" className="w-auto px-8" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        <Toaster richColors position="top-right" theme="dark" />
      </main>

      {/* CurvedLoop marquee — bottom of page */}
      <div className="relative" style={{ zIndex: 1 }}>
        <div className="w-full border-t border-primary/10" />
        <CurvedLoop
          marqueeText="Brainstorm · AI Note Summarizer · Smart Summaries · Capture · Summarize · Organize · "
          speed={0.5}
          curveAmount={150}
          direction="left"
          interactive={true}
          className="fill-primary/40 text-[2rem]"
        />
      </div>
    </>
  );
}
