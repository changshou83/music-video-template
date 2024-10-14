import { Loop, useVideoConfig } from "remotion";

const LoopedOffthreadVideoContainer: React.FC<{
  durationInSeconds: number | null;
  children: React.ReactNode;
}> = ({ durationInSeconds, children }) => {
  const { fps } = useVideoConfig();

  if (durationInSeconds === null) {
    return null;
  }

  return (
    <Loop durationInFrames={Math.floor(fps * durationInSeconds)}>
      {children}
    </Loop>
  );
};

export default LoopedOffthreadVideoContainer;
