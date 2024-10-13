import React, { useEffect, useRef, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  continueRender,
  delayRender,
  Img,
  Sequence,
  useVideoConfig,
} from "remotion";

export const fps = 30;

import { PaginatedSubtitles } from "./components/Subtitles";
import { z } from "zod";
import AudioViz from "./components/AudioViz";
import { AudioGramSchema } from "./schema/AudioGramSchema";

type AudiogramCompositionSchemaType = z.infer<typeof AudioGramSchema>;

export const AudiogramComposition: React.FC<AudiogramCompositionSchemaType> = ({
  subtitlesFileName,
  audioFileName,
  coverImgFileName,
  subtitlesTextColor,
  subtitlesLinePerPage,
  waveColor,
  waveNumberOfSamples,
  waveFreqRangeStartIndex,
  waveLinesToDisplay,
  subtitlesZoomMeasurerSize,
  subtitlesLineHeight,
  onlyDisplayCurrentSentence,
  mirrorWave,
  audioOffsetInSeconds,
}) => {
  const { durationInFrames } = useVideoConfig();

  const [handle] = useState(() => delayRender());
  const [subtitles, setSubtitles] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(subtitlesFileName)
      .then((res) => res.text())
      .then((text) => {
        setSubtitles(text);
        continueRender(handle);
      })
      .catch((err) => {
        console.log("Error fetching subtitles", err);
      });
  }, [handle, subtitlesFileName]);

  if (!subtitles) {
    return null;
  }

  const audioOffsetInFrames = Math.round(audioOffsetInSeconds * fps);

  return (
    <div ref={ref}>
      <AbsoluteFill>
        <Sequence from={-audioOffsetInFrames}>
          <Audio pauseWhenBuffering src={audioFileName} />

          <div
            className="container"
            style={{
              fontFamily: "IBM Plex Sans",
            }}
          >
            <Img
              className="cover"
              style={{
                width: "100%",
                transform: "translateY(-18%)",
                zIndex: -1,
                position: "absolute",
              }}
              src={coverImgFileName}
            />

            <div style={{ position: "absolute", bottom: 0 }}>
              <div>
                <AudioViz
                  audioSrc={audioFileName}
                  mirrorWave={mirrorWave}
                  waveColor={waveColor}
                  numberOfSamples={Number(waveNumberOfSamples)}
                  freqRangeStartIndex={waveFreqRangeStartIndex}
                  waveLinesToDisplay={waveLinesToDisplay}
                />
              </div>

              <div
                style={{ lineHeight: `${subtitlesLineHeight}px` }}
                className="captions"
              >
                <PaginatedSubtitles
                  subtitles={subtitles}
                  startFrame={audioOffsetInFrames}
                  endFrame={audioOffsetInFrames + durationInFrames}
                  linesPerPage={subtitlesLinePerPage}
                  subtitlesTextColor={subtitlesTextColor}
                  subtitlesZoomMeasurerSize={subtitlesZoomMeasurerSize}
                  subtitlesLineHeight={subtitlesLineHeight}
                  onlyDisplayCurrentSentence={onlyDisplayCurrentSentence}
                />
              </div>
            </div>
          </div>
        </Sequence>
      </AbsoluteFill>
    </div>
  );
};
