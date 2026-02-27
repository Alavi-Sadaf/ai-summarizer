import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface SummaryBoxProps {
    summary?: string;
    onGenerate?: () => void;
    isGenerating?: boolean;
}

export function SummaryBox({ summary, onGenerate, isGenerating }: SummaryBoxProps) {
    return (
        <AnimatePresence mode="wait">
            {!summary && onGenerate ? (
                <motion.div 
                    key="placeholder"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-8 rounded-2xl border-none liquid-glass flex flex-col items-center text-center space-y-5"
                >
                    <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-primary/60" />
                    </div>
                    <div className="space-y-1.5">
                        <h3 className="font-bold text-base">No summary yet</h3>
                        <p className="text-muted-foreground text-sm max-w-xs">
                            Let AI analyze this note and extract key insights.
                        </p>
                    </div>
                    <Button
                        onClick={onGenerate}
                        disabled={isGenerating}
                        className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6 h-10 text-sm font-semibold shadow-lg shadow-primary/20 transition-all"
                    >
                        {isGenerating ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Sparkles className="h-4 w-4" />
                        )}
                        {isGenerating ? "Analyzing..." : "Generate Summary"}
                    </Button>
                </motion.div>
            ) : summary ? (
                <motion.div 
                    key="summary"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                     className="relative overflow-hidden rounded-2xl border-none liquid-glass p-6 group"
                >
                    <div className="absolute top-0 right-0 p-5 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Sparkles className="h-12 w-12 text-primary" />
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-6 w-6 bg-primary/15 rounded-lg flex items-center justify-center">
                            <Sparkles className="h-3 w-3 text-primary" />
                        </div>
                        <h3 className="text-[11px] font-bold uppercase tracking-wider text-primary">AI Summary</h3>
                    </div>

                    <p className="text-sm leading-relaxed text-foreground/85 whitespace-pre-wrap">
                        {summary}
                    </p>
                    
                    <div className="mt-4 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground/40 text-nowrap">
                            <span className="h-px w-6 bg-primary/15" />
                            AI-Powered Analysis
                        </div>
                        
                        {onGenerate && (
                            <Button
                                onClick={onGenerate}
                                disabled={isGenerating}
                                variant="ghost"
                                size="sm"
                                className="h-7 px-3 text-[10px] font-bold uppercase tracking-wider text-primary/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-all gap-1.5"
                            >
                                {isGenerating ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                    <Sparkles className="h-3 w-3" />
                                )}
                                {isGenerating ? "Regenerating..." : "Regenerate"}
                            </Button>
                        )}
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
