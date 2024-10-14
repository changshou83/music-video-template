import { Composition } from "remotion";
import { AudiogramComposition, fps } from "./Composition";
import { AudioGramSchema } from "./schema/AudioGramSchema";
import getVideoSettings from "./utils/getVideoSettings";
import "./style.css";

export const RemotionRoot: React.FC = () => {
  const videoSettings = getVideoSettings();
  return (
    <>
      <Composition
        id="Audiogram"
        component={AudiogramComposition}
        fps={fps}
        width={1920}
        height={1080}
        schema={AudioGramSchema}
        defaultProps={videoSettings}
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
