"use client";
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { EncryptedText } from "@/components/ui/encrypted-text"
import { Download, FileText, KeyRound, Lightbulb, NotepadText, Timer, Zap } from "lucide-react"
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { useState } from "react"
import { getSummary } from "@/lib/user.actions";

const perks = [
    {
        title: "Fast Summarization",
        description: "Get quick summaries of lengthy YouTube videos in seconds.",
        icon: NotepadText
    },
    {
        title: "Key Takeaways",
        description: "Highlight the most important points from any video.",
        icon: KeyRound
    },
    {
        title: "Time Saving",
        description: "Save time by quickly grasping the essence of any video.",
        icon: Timer
    }
]

const loadingStates = [
    { text: "Skipping the sponsor segment…" },
    { text: "Watching at 10x speed so you don’t have to" },
    { text: "Ignoring the YouTuber’s life story…" },
    { text: "Finding the actual useful part" },
    { text: "TL;DR-ing the internet…" },
];


const Page = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState("");
    const [index, setIndex] = useState<number>(0);


    const onSubmit = async () => {
        setIsLoading(true);

        try {
            const response = await getSummary(input);
            console.log("Response:", response);
            setData(response);
        }
        catch (error) {
            console.error("Error fetching summary:", error);
        }
        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <Loader loadingStates={loadingStates} loading={isLoading} duration={1000} />
        )
    }

    else if (!data && isLoading === false) {
        return (
            <div className='h-full flex flex-col items-center justify-around bg-black'>
                <div className='flex flex-col items-center'>
                    <h2 className='text-4xl text-center font-bold mb-4 text-[#BEA2E7] drop-shadow-[0_0_15px_rgba(190,162,231,0.7)]'>Youtube Summarizer</h2>
                    <p className='text-white max-w-2xl text-center px-4'>
                        < EncryptedText
                            text="Paste a YouTube video link below to generate a concise summary of its content. Perfect for quickly understanding lengthy videos!"
                            encryptedClassName="text-neutral-500"
                            revealedClassName="text-white"
                            revealDelayMs={50}
                        /></p>
                </div>
                <div className="group flex w-full max-w-2xl items-center gap-2 rounded-full border-2 border-white/10 bg-[#0A0A0A] p-2 transition-all duration-300 ease-in-outhover:border-purple-500/50 focus-within:border-purple-500 focus-within:shadow-[0_0_30px_-5px_rgba(168,85,247,0.6)]">
                    {/* Input Field */}
                    <input
                        type="text"
                        placeholder="Enter YouTube URL here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full flex-1 bg-transparent px-6 py-3 text-lg text-white placeholder-neutral-500 outline-none" />

                    {/* Summarize Button */}
                    <button onClick={onSubmit} className="flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 font-semibold text-white transition-transform active:scale-95 cursor-pointer">
                        <Zap className="h-5 w-5 fill-white" />
                        <span>Summarize</span>
                    </button>
                </div>
                <div className="flex items-start gap-4">
                    {perks.map((perk) => (
                        < BackgroundGradient
                            key={perk.title}
                            containerClassName="p-2 rounded-md"
                            className="flex flex-col items-center gap-2 p-4 bg-black rounded-md"

                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600/20 text-purple-400">
                                <perk.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">{perk.title}</h3>
                            <p className="max-w-xs text-center text-white/70">{perk.description}</p>
                        </ BackgroundGradient>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-4xl font-bold text-white text-center">Summary</h2>
            <div className="relative flex flex-col border-2 rounded-md gap-6 p-4 w-full max-w-7xl mx-auto bg-black">
                <button className="absolute top-3 right-2 bg-slate-400 p-2 rounded-md w-fit cursor-pointer"><Download /></button>
                <h2 className="text-2xl font-bold text-white text-center bg-purple-500 p-2 rounded-md">{data?.title}</h2>
                <div className="flex flex-col gap-4 border-2 border-purple-500 bg-black p-4 rounded-md shadow-[inset_0_0_20px_rgba(168,85,247,0.6)]">
                    <h3 className="text-xl font-semibold text-white mb-2"><FileText className="bg-purple-200 p-1 rounded-md size-8 text-purple-600 inline mr-2" />Description</h3>
                    <div className="w-[90%] h-[1px] bg-purple-500 mx-auto" />
                    <p className="text-white w-[90%] mx-auto">{data?.description}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col gap-4 border-2 border-purple-500 bg-black p-4 rounded-md w-full md:w-1/2 shadow-[inset_0_0_20px_rgba(168,85,247,0.6)]">
                        <h3 className="text-xl font-semibold text-white mb-2"><Lightbulb className="bg-purple-200 p-1 rounded-md size-8 text-purple-600 inline mr-2" />Highlights</h3>
                        <div className="w-[90%] h-[1px] bg-purple-500 mx-auto" />
                        {data?.highlights.map((point, index) => (
                            <div key={index} className="flex w-[90%] mx-auto text-white gap-2 items-center">
                                <div className="size-3 rounded-full bg-purple-500" />
                                <p>{point}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4 border-2 border-purple-500 bg-black p-4 rounded-md w-full md:w-1/2 shadow-[inset_0_0_20px_rgba(168,85,247,0.6)]">
                        <h3 className="text-xl font-semibold text-white mb-2"><KeyRound className="bg-purple-200 p-1 rounded-md size-8 text-purple-600 inline mr-2" />Keypoints</h3>
                        <div className="w-[90%] h-[1px] bg-purple-500 mx-auto" />
                        {data?.key_points.map((point, index) => (
                            <div key={index} className="flex w-[90%] mx-auto text-white gap-2 items-center">
                                <div className="size-3 rounded-full bg-purple-500" />
                                <p>{point}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4 border-2 border-purple-500 bg-black p-4 rounded-md shadow-[inset_0_0_20px_rgba(168,85,247,0.6)]">
                    <h3 className="text-xl font-semibold text-white mb-2"><FileText className="bg-purple-200 p-1 rounded-md size-8 text-purple-600 inline mr-2" />Conclusion</h3>
                    <div className="w-[90%] h-[1px] bg-purple-500 mx-auto" />
                    <p className="text-white w-[90%] mx-auto">{data?.conclusion}</p>
                </div>
                <div className="flex flex-col gap-4 border-2 border-purple-500 bg-black p-4 rounded-md shadow-[inset_0_0_20px_rgba(168,85,247,0.6)]">
                    <h3 className="text-xl font-semibold text-white mb-2"><Timer className="bg-purple-200 p-1 rounded-md size-8 text-purple-600 inline mr-2" />Time Stamps</h3>
                    <p className="text-white w-[90%] mx-auto text-center font-bold"><span className="text-blue-500 font-bold">{data?.timestamps[index].time}</span> {data?.timestamps[index].summary}</p>
                    <div className="flex w-[90%] justify-around mx-auto">
                        <button className="p-1 bg-purple-500 rounded-md min-w-[41px] cursor-pointer" onClick={() => setIndex((prev) => prev - 1)} disabled={index === 0}>Prev</button>
                        <button className="p-1 bg-purple-500 rounded-md min-w-[41px] cursor-pointer" onClick={() => setIndex((prev) => prev + 1)} disabled={index === data?.timestamps.length - 1}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page


