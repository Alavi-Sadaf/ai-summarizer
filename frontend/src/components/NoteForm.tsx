"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface NoteFormProps {
    initialTitle?: string;
    initialContent?: string;
    onSubmit: (title: string, content: string) => Promise<void>;
    submitLabel?: string;
}

export function NoteForm({
    initialTitle = "",
    initialContent = "",
    onSubmit,
    submitLabel = "Save Note"
}: NoteFormProps) {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        try {
            setLoading(true);
            await onSubmit(title, content);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="title" className="text-[11px] font-semibold uppercase tracking-wider text-primary/70 ml-1">
                    Title
                </label>
                <Input
                    id="title"
                    placeholder="What's on your mind?"
                    className="h-12 px-4 bg-background/50 border-primary/10 focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/20 text-base font-medium rounded-xl transition-all"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="content" className="text-[11px] font-semibold uppercase tracking-wider text-primary/70 ml-1">
                    Content
                </label>
                <Textarea
                    id="content"
                    placeholder="Write your thoughts here..."
                    className="min-h-[200px] p-4 bg-background/50 border-primary/10 focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/20 text-base leading-relaxed resize-none rounded-xl transition-all"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>

            <Button
                type="submit"
                className="w-full h-12 rounded-xl text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.99]"
                disabled={loading}
            >
                {loading ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                    </div>
                ) : (
                    submitLabel
                )}
            </Button>
        </form>
    );
}
