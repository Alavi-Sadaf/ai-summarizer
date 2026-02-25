import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function Loader() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 gap-6"
        >
            <div className="relative">
                <div className="absolute inset-0 bg-primary/15 blur-2xl rounded-full animate-pulse" />
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="relative h-14 w-14 bg-card border border-primary/15 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/10"
                >
                    <Loader2 className="h-6 w-6 text-primary" />
                </motion.div>
            </div>
            <div className="space-y-1 text-center">
                <p className="text-sm font-semibold text-foreground/80">Loading...</p>
                <p className="text-xs text-muted-foreground">Fetching your notes</p>
            </div>
        </motion.div>
    );
}

export function SkeletonLoader() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div 
                    key={i} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className="h-56 rounded-2xl bg-card/50 border border-primary/5 p-5 space-y-4"
                >
                    <div className="h-5 w-2/3 bg-primary/8 rounded-lg animate-pulse" />
                    <div className="space-y-2.5">
                        <div className="h-3 w-full bg-muted/15 rounded-md animate-pulse" />
                        <div className="h-3 w-full bg-muted/15 rounded-md animate-pulse" />
                        <div className="h-3 w-1/2 bg-muted/15 rounded-md animate-pulse" />
                    </div>
                    <div className="pt-3 flex gap-3">
                        <div className="h-9 flex-1 bg-muted/8 rounded-xl animate-pulse" />
                        <div className="h-9 flex-1 bg-muted/8 rounded-xl animate-pulse" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
