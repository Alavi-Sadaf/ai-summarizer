"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2 } from "lucide-react";

interface CreateNoteDialogProps {
    onCreate: (title: string, content: string) => Promise<void>;
}

export function CreateNoteDialog({ onCreate }: CreateNoteDialogProps) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) return;

        setLoading(true);
        try {
            await onCreate(title, content);
            setTitle("");
            setContent("");
            setOpen(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-full h-12 px-6 gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                    <Plus className="h-5 w-5" />
                    <span>New Note</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] border-primary/20 bg-background/95 backdrop-blur-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold tracking-tight">Capture Insight</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Add a new note and let Gemini AI summarize its core message.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-6">
                        <div className="space-y-2">
                            <Input
                                id="title"
                                placeholder="Topic or Headline"
                                className="col-span-3 border-primary/10 focus-visible:ring-primary/30 h-11 text-lg font-medium"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <div className="space-y-2">
                            <Textarea
                                id="content"
                                placeholder="Write your thoughts here..."
                                className="col-span-3 min-h-[150px] border-primary/10 focus-visible:ring-primary/30 resize-none leading-relaxed"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setOpen(false)}
                            className="text-muted-foreground"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading || !title || !content}
                            className="px-8 shadow-md shadow-primary/10"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Note"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
