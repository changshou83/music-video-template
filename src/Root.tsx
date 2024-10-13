import { Composition, staticFile } from "remotion";
import { AudiogramComposition, fps } from "./Composition";
import { AudioGramSchema } from "./schema/AudioGramSchema";
import "./style.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Audiogram"
        component={AudiogramComposition}
        fps={fps}
        width={1920}
        height={1080}
        schema={AudioGramSchema}
        defaultProps={{
          // Audio settings
          audioOffsetInSeconds: 0,

          // Title settings
          audioFileName: staticFile("audio.mp3"),
          coverImgFileName: staticFile("cover.jpg"),

          // Subtitles settings
          subtitlesFileName: staticFile("lyric.srt"),
          onlyDisplayCurrentSentence: true,
          subtitlesTextColor: "rgba(255, 255, 255, 0.93)",
          subtitlesLinePerPage: 2, // 根据单行或双行歌词进行修改
          subtitlesZoomMeasurerSize: 2,
          subtitlesLineHeight: 72, // 根据单行或双行歌词进行修改

          // Wave settings
          waveColor: "#9E9E9E", // 根据当前封面图片进行修改
          waveFreqRangeStartIndex: 7,
          waveLinesToDisplay: 100,
          waveNumberOfSamples: "256", // This is string for Remotion controls and will be converted to a number
          mirrorWave: false,
          durationInSeconds: 220, // 改为歌曲长度
        }}
        // Determine the length of the video based on the duration of the audio file
        calculateMetadata={({ props }) => {
          return {
            durationInFrames: props.durationInSeconds * fps,
            props,
          };
        }}
      />
    </>
  );
};
