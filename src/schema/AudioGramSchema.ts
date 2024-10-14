import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { imgExt, videoExt } from "../constants/BackgroundFileTypeExt";

const coverFileNameType = [...imgExt, ...videoExt];

export const AudioGramSchema = z.object({
  durationInSeconds: z.number().positive(),
  audioOffsetInSeconds: z.number().min(0),
  subtitlesFileName: z.string().refine((s) => s.endsWith(".srt"), {
    message: "Subtitles file must be a .srt file",
  }),
  audioFileName: z.string().refine((s) => s.endsWith(".mp3"), {
    message: "Audio file must be a .mp3 file",
  }),
  coverFileName: z
    .string()
    .refine((s) => coverFileNameType.some((ext) => s.endsWith(ext)), {
      message: `File must be a ${coverFileNameType.map((ext) => `.${ext}`).join(" / ")} file`,
    }),
  waveColor: zColor(),
  subtitlesTextColor: zColor(),
  subtitlesLinePerPage: z.number().int().min(0),
  subtitlesLineHeight: z.number().int().min(0),
  subtitlesZoomMeasurerSize: z.number().int().min(0),
  onlyDisplayCurrentSentence: z.boolean(),
  mirrorWave: z.boolean(),
  waveLinesToDisplay: z.number().int().min(0),
  waveFreqRangeStartIndex: z.number().int().min(0),
  waveNumberOfSamples: z.enum(["32", "64", "128", "256", "512"]),
});
