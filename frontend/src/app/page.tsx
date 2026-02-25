"use client";

import { useEffect, useState } from "react";
import { getNotes, deleteNote, summarizeNote, Note } from "@/lib/api";
import { NoteCard } from "@/components/NoteCard";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { SkeletonLoader } from "@/components/Loader";
import { Search, Sparkles, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Aurora = dynamic(() => import("@/components/Aurora"), { ssr: false });

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [summarizingId, setSummarizingId] = useState<string | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes();
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
      await deleteNote(id);
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
      const updatedNote = await summarizeNote(id);
      setNotes(notes.map((n) => (n.id === id ? updatedNote : n)));
      toast.success("Summary generated.");
    } catch (error) {
      toast.error("Summarization failed.");
    } finally {
      setSummarizingId(null);
    }
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-[700px] -z-10 opacity-60 pointer-events-none overflow-hidden border-none">
        <Aurora 
          colorStops={["#3b0764", "#6d28d9", "#4c1d95"]}
          amplitude={1.2}
          speed={0.5}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>
      <main className="container mx-auto px-4 pt-28 pb-32 relative">
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

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95]">
          Your <span className="text-primary italic">Second</span> Brain
        </h1>

        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Capture thoughts, summarize with Gemini, and build your knowledge base.
        </p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative max-w-md mx-auto mt-8"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            className="pl-11 h-11 bg-card/60 border-primary/10 focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/30 rounded-xl text-sm transition-all placeholder:text-muted-foreground/40"
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
              className="flex flex-col items-center justify-center py-24 text-center space-y-8 border border-primary/10 rounded-2xl bg-card/30"
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
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all">
                  <Plus className="h-4 w-4" />
                  Create your first note
                </button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <Toaster richColors position="top-right" theme="dark" />
    </main>
    </>
  );
}
