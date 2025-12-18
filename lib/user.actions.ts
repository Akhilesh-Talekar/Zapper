"use server";
import { group } from "console";
import { getVideoId, groupCaptions } from "./utils";
import { fetchTranscript } from "youtube-transcript-plus";
import { openai } from "./openai";

export async function getTranscript(videoId: string) {
  console.log("Fetching transcript for videoId:", videoId);

  try {
    // youtube-captions-scraper is more reliable for auto-generated captions
    const transcript = await fetchTranscript(videoId);

    const totalDuration = transcript[transcript.length - 1].offset / 60;

    let granularity = 25; // default window size
    if (totalDuration > 20) {
      granularity = 45; // increase window size for longer videos
    } else if (totalDuration > 60) {
      granularity = 120; // medium window size for medium videos
    }

    const groupedTranscript = groupCaptions(transcript, granularity);

    return groupedTranscript;
  } catch (error: any) {
    console.error("Error fetching transcript:", error);
    throw new Error(`Failed to fetch transcript: ${error.message || error}`);
  }
}

export const getSummary = async (input: string) => {
  const videoId = getVideoId(input);

  console.log("Input URL:", input);
  console.log("Extracted videoId:", videoId);

  if (!videoId) {
    throw new Error("Could not extract video ID from URL");
  }

  const transcript = await getTranscript(videoId);

  const prompt = `You are a highly intelligent YouTube video summarization assistant.

Your task is to analyze the **transcript** of a YouTube video and return a detailed JSON object with the following fields:

1. "title": A concise and accurate title of the video (use clues from transcript if necessary).
2. "description": A 2–4 sentence summary of what the video is about.
3. "highlights": A paragraph summarizing the core ideas, insights, or themes of the video.  // This should be a bit more detailed than the description but still concise and should be in format String[] and should almost be in same length that of key_points.
4. "timestamps": A list of key moments in the video. Each entry should be an object with:
   - "time": Timestamp in MM:SS format.
   - "summary": A 1–2 sentence description of what happens or is explained at this point.
5. "key_points": An array of concise, standalone bullet points highlighting the most useful takeaways, such as: // Make sure these are different from the highlights and are unique should be in format String[] and should almost be in same length that of highlights.
   - Key definitions
   - Formulas
   - Core ideas
   - Actionable tips
   - Thought-provoking facts
6. "conclusion": A brief summary of the video’s conclusion or final thoughts.

### Guidelines:
- Your response must be a **valid JSON object** only (no Markdown or extra commentary).
- If the transcript is vague or incomplete, use your best judgment to create a meaningful summary.
- Do not hallucinate or make up content not present in the transcript.
- Aim for clarity, specificity, and usefulness — avoid fluff or repetition.

---

### Input:
Transcript:
""" 
${transcript
  .map((t) => {
    return `[${t.time}] ${t.text}`;
  })
  .join("\n")}`;

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });

  const text = response.output_text?.trim() ?? "";

  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  const jsonSubstring = text.substring(firstBrace, lastBrace + 1);

  const parsed = JSON.parse(jsonSubstring);
  return parsed;
};
