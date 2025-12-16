import { BackgroundGradient } from "@/components/ui/background-gradient"
import { EncryptedText } from "@/components/ui/encrypted-text"
import { KeyRound, NotepadText, Timer, Zap } from "lucide-react"

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
        description: "Save time by quickly grasping the essence of any video without watching it entirely.",
        icon: Timer
    }
]

const page = () => {
    return (
        <div className='h-full flex flex-col items-center justify-around bg-black'>
            <div className='flex flex-col items-center'>
                <h2 className='text-4xl font-bold mb-4 text-[#BEA2E7] drop-shadow-[0_0_15px_rgba(190,162,231,0.7)]'>Youtube Summarizer</h2>
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
                    className="w-full flex-1 bg-transparent px-6 py-3 text-lg text-white placeholder-neutral-500 outline-none" />

                {/* Summarize Button */}
                <button className="flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 font-semibold text-white transition-transform active:scale-95 cursor-pointer">
                    <Zap className="h-5 w-5 fill-white" />
                    <span>Summarize</span>
                </button>
            </div>
            <div className="flex gap-4">
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

export default page


