import * as React from "react"
import { cn } from "@/lib/utils";

interface ButtonCtaProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    className?: string;
    showBorder?: boolean;
}

function ButtonCta({ label = "Get Access", className, showBorder = true, ...props }: ButtonCtaProps) {
    return (
        <button
            className={cn(
                "group relative h-12 px-6 overflow-hidden transition-all duration-500 cursor-pointer rounded-sm",
                className
            )}
            {...props}
        >
            {/* Outer border gradient — violet to deep purple */}
            {showBorder && (
                <div className="absolute inset-0 p-[1.5px] bg-gradient-to-b from-[#a855f7] via-[#3b0764] to-[#6d28d9]">
                    <div className="absolute inset-0 bg-[#0d0620]" />
                </div>
            )}

            {/* Base fill */}
            <div className="absolute inset-[1.5px] bg-[#0d0620]" />

            {/* Horizontal sheen */}
            <div className="absolute inset-[1.5px] bg-gradient-to-r from-[#0d0620] via-[#1a0840] to-[#0d0620] opacity-90" />

            {/* Vertical depth */}
            <div className="absolute inset-[1.5px] bg-gradient-to-b from-[#a855f7]/20 via-[#1a0840] to-[#6d28d9]/25 opacity-80" />

            {/* Diagonal shimmer */}
            <div className="absolute inset-[1.5px] bg-gradient-to-br from-[#c084fc]/10 via-[#1a0840] to-[#4c1d95]/40" />

            {/* Inner glow */}
            <div className="absolute inset-[1.5px] shadow-[inset_0_0_18px_rgba(168,85,247,0.15)]" />

            {/* Label */}
            <div className="relative flex items-center justify-center gap-2">
                <span className="text-base font-light bg-gradient-to-b from-[#e9d5ff] to-[#a855f7] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] tracking-tight">
                    {label}
                </span>
            </div>

            {/* Hover shimmer overlay */}
            <div className="absolute inset-[1.5px] opacity-0 transition-opacity duration-300 bg-gradient-to-r from-[#4c1d95]/20 via-[#a855f7]/12 to-[#4c1d95]/20 group-hover:opacity-100" />
        </button>
    );
}

export { ButtonCta }