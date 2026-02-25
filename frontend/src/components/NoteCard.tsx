"use client";

import { Note } from "@/lib/api";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Sparkles, Clock, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { motion } from "framer-motion";

interface NoteCardProps {
    note: Note;
    onDelete: (id: string, e: React.MouseEvent) => void;
    onSummarize: (id: string, e: React.MouseEvent) => void;
    isSummarizing?: boolean;
}

export function NoteCard({ note, onDelete, onSummarize, isSummarizing }: NoteCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
        >
            <Link href={`/note/${note.id}`} className="block group h-full">
                <Card className="relative h-full overflow-hidden transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/5 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 rounded-2xl">
                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <CardHeader className="pb-2 relative z-10">
                        <div className="flex justify-between items-start gap-2">
                            <CardTitle className="text-lg font-bold tracking-tight line-clamp-1">{note.title}</CardTitle>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 -mr-2 shrink-0 h-8 w-8 rounded-lg transition-colors"
                                onClick={(e) => onDelete(note.id, e)}
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                        <div className="flex items-center text-[10px] font-medium text-muted-foreground/50 gap-1.5 mt-1">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(new Date(note.created_at), { addSuffix: true })}
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-4 relative z-10">
                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                            {note.content}
                        </p>

                        {note.summary && (
                            <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 relative overflow-hidden">
                                <div className="absolute top-2 right-2 opacity-30">
                                    <Sparkles className="h-3 w-3 text-primary" />
                                </div>
                                <p className="text-[11px] font-medium text-primary/80 mb-1 uppercase tracking-wider">AI Summary</p>
                                <p className="text-xs text-foreground/70 line-clamp-2 leading-relaxed">
                                    {note.summary}
                                </p>
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="pt-1 flex gap-2 px-5 pb-5 relative z-10">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 rounded-xl text-xs font-semibold gap-1.5 text-muted-foreground hover:text-foreground hover:bg-primary/5 h-9 transition-colors"
                        >
                            Read
                            <ArrowRight className="h-3 w-3" />
                        </Button>

                        {!note.summary && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 rounded-xl text-xs font-semibold gap-1.5 border-primary/15 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all z-10 h-9"
                                onClick={(e) => onSummarize(note.id, e)}
                                disabled={isSummarizing}
                            >
                                <Sparkles className="h-3 w-3 text-primary" />
                                {isSummarizing ? "Thinking..." : "Summarize"}
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </Link>
        </motion.div>
    );
}
