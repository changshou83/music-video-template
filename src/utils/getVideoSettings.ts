import { staticFile } from "remotion";
import { AudioGramSchema } from "../schema/AudioGramSchema";
import { z } from "zod";

const getVideoSettings = (): z.infer<typeof AudioGramSchema> => {
  return {
    // Audio settings
    audioOffsetInSeconds: 0,

    // Title settings
    audioFileName: staticFile("audio.mp3"),
    coverFileName: staticFile("cover.jpg"),

    // Subtitles settings
    subtitlesFileName: staticFile("lyric.srt"),
    onlyDisplayCurrentSentence: true,
    subtitlesTextColor: "rgba(255, 255, 255, 0.93)",
    subtitlesLinePerPage: 2, // 根据单行或双行歌词进行修改
    subtitlesZoomMeasurerSize: 2,
    subtitlesLineHeight: 72, // 根据单行或双行歌词进行修改

    // Wave settings
    waveColor: ["#9E9E9E", "red", "green"], // 根据当前封面图片进行修改
    waveFreqRangeStartIndex: 7,
    waveLinesToDisplay: 100,
    waveNumberOfSamples: "256", // This is string for Remotion controls and will be converted to a number
    mirrorWave: false,
    durationInSeconds: 220, // 改为歌曲长度
  };
};

export default getVideoSettings;
