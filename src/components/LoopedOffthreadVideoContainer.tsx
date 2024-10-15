import { Loop, useVideoConfig } from "remotion";
import { AudioGramSchema } from "../schema/AudioGramSchema";
import { z } from "zod";

const LoopedOffthreadVideoContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { defaultProps, fps } = useVideoConfig();
  const { durationInSeconds } = defaultProps as z.infer<typeof AudioGramSchema>;

  let durationInFrames = 9999;
  if (durationInSeconds) {
    durationInFrames = Math.floor(fps * durationInSeconds);
  }
  return <Loop durationInFrames={durationInFrames}>{children}</Loop>;
};

export default LoopedOffthreadVideoContainer;
