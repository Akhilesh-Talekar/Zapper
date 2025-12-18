import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { YoutubeTranscript } from "youtube-transcript";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getVideoId(input: string) {
  try {
    const url = new URL(input);

    // youtu.be/{id}
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.slice(1);
    }

    // youtube.com
    if (url.hostname.includes("youtube.com")) {
      // watch?v={id}
      const v = url.searchParams.get("v");
      if (v) return v;

      // shorts/{id}
      const shortsMatch = url.pathname.match(/\/shorts\/([^/?]+)/);
      if (shortsMatch) return shortsMatch[1];

      // embed/{id}
      const embedMatch = url.pathname.match(/\/embed\/([^/?]+)/);
      if (embedMatch) return embedMatch[1];
    }

    return input; // assume already a video ID
  } catch {
    return input; // fallback if input is not a URL
  }
}

export function cleanText(text: string) {
  return text
    .replace(/&amp;#39;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function toMMSS(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export function groupCaptions(captions, windowSize = 12) {
  const groups = [];
  let currentGroup = null;

  for (const cap of captions.sort((a, b) => a.offset - b.offset)) {
    if (!currentGroup || cap.offset - currentGroup.start > windowSize) {
      // start new group
      currentGroup = {
        start: cap.offset,
        texts: [],
      };
      groups.push(currentGroup);
    }

    currentGroup.texts.push(cleanText(cap.text));
  }

  return groups.map((g) => ({
    time: toMMSS(g.start),
    text: g.texts.join(" "),
  }));
}
