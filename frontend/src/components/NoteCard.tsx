"use client";

import { Note } from "@/lib/api";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Sparkles, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface NoteCardProps {
    note: Note;
    onDelete: (id: string) => void;
    onSummarize: (id: string) => void;
    isSummarizing?: boolean;
}

export function NoteCard({ note, onDelete, onSummarize, isSummarizing }: NoteCardProps) {
    return (
        <Card className="group relative overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/5 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold tracking-tight line-clamp-1">{note.title}</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mr-2"
                        onClick={() => onDelete(note.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center text-xs text-muted-foreground gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(note.created_at), { addSuffix: true })}
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <p className="text-sm text-foreground/80 line-clamp-3 leading-relaxed">
                        {note.content}
                    </p>
                </div>

                {note.summary && (
                    <div className="relative p-3 rounded-lg bg-primary/5 border border-primary/10 overflow-hidden group/summary">
                        <div className="absolute top-0 right-0 p-1">
                            <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                        </div>
                        <h4 className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">AI Summary</h4>
                        <p className="text-xs italic text-muted-foreground leading-normal">
                            "{note.summary}"
                        </p>
                    </div>
                )}
            </CardContent>

            <CardFooter className="pt-0 justify-end">
                {!note.summary && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs gap-1.5 border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all"
                        onClick={() => onSummarize(note.id)}
                        disabled={isSummarizing}
                    >
                        <Sparkles className="h-3.5 w-3.5" />
                        {isSummarizing ? "Summarizing..." : "Summarize with AI"}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
