"use client";
import React from "react";
import { WavyBackground } from "./ui/wavy-background";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export function WavyBackgroundDemo() {
    return (
        <WavyBackground className="max-w-4xl mx-auto flex flex-col items-center justify-center" containerClassName="w-screen">
            <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
                Zapper
            </p>
            <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
                Your AI-powered <span className="font-bold text-red-500">Youtube</span> summarization tool for effortless content digestion.
            </p>
            <br />
            <br />
            <Link className="relative inline-flex h-12 overflow-hidden rounded-full p-[3px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 pointer-events-auto group" href={"/summarizer"}>
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    <span className="mr-2">Get Started</span>
                    <MoveRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
            </Link>
        </WavyBackground>
    );
}
