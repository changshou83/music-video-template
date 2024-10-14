import {
  interpolate,
  interpolateColors,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";

function getBackgroundColors(
  waveColor: string[],
  frequenciesToDisplay: number[],
) {
  const range = waveColor.map((v, i) =>
    interpolate(i, [0, waveColor.length], [0, frequenciesToDisplay.length]),
  );
  return frequenciesToDisplay.map((v, i) => {
    return interpolateColors(i, range, waveColor);
  });
}

const AudioViz: React.FC<{
  waveColor: string[];
  numberOfSamples: number;
  freqRangeStartIndex: number;
  waveLinesToDisplay: number;
  mirrorWave: boolean;
  audioSrc: string;
}> = ({
  waveColor,
  numberOfSamples,
  freqRangeStartIndex,
  waveLinesToDisplay,
  mirrorWave,
  audioSrc,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const audioData = useAudioData(audioSrc);

  if (!audioData) {
    return null;
  }

  const frequencyData = visualizeAudio({
    fps,
    frame,
    audioData,
    numberOfSamples, // Use more samples to get a nicer visualisation
  });

  // Pick the low values because they look nicer than high values
  // feel free to play around :)
  const frequencyDataSubset = frequencyData.slice(
    freqRangeStartIndex,
    freqRangeStartIndex +
      (mirrorWave ? Math.round(waveLinesToDisplay / 2) : waveLinesToDisplay),
  );

  const frequenciesToDisplay = mirrorWave
    ? [...frequencyDataSubset.slice(1).reverse(), ...frequencyDataSubset]
    : frequencyDataSubset;
  const backgroundColors = getBackgroundColors(waveColor, frequenciesToDisplay);

  return (
    <div className="audio-viz">
      {frequenciesToDisplay.map((v, i) => {
        return (
          <div
            key={i}
            className="bar"
            style={{
              minWidth: "1px",
              backgroundColor: backgroundColors[i],
              height: `${500 * Math.sqrt(v)}%`,
            }}
          />
        );
      })}
    </div>
  );
};

export default AudioViz;
