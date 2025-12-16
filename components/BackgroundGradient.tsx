import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export function BackgroundGradient() {
    return (
        <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex flex-col items-center justify-center text-white font-bold px-4 pointer-events-none text-center md:text-4xl lg:text-7xl gap-6">
                <div className="flex flex-col items-center justify-center gap-3">
                    <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
                        Zapper
                    </p>
                    <p className="text-xl">Your AI-powered <span className="text-red-500">Youtube</span> video summarizer</p>
                </div>
                <Link className="relative inline-flex h-12 overflow-hidden rounded-full p-[3px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 pointer-events-auto group" href={"/summarizer"}>
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        <span className="mr-2">Get Started</span>
                        <MoveRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                </Link>
            </div>
        </BackgroundGradientAnimation>
    );
}
