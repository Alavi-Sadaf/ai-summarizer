"use client";

import { useState } from "react";
import { ButtonCta } from "@/components/ui/button-shiny";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


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
                    className="h-12 glass-input border-none text-base font-medium"
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
                    className="min-h-[200px] glass-textarea border-none text-base leading-relaxed resize-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>

            <ButtonCta
                type="submit"
                disabled={loading}
                className="w-full rounded-xl"
                label={
                    loading ? "Saving..." : submitLabel
                }
            />
        </form>
    );
}
