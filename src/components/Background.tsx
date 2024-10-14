import { AbsoluteFill, Img, OffthreadVideo } from "remotion";
import { imgExt, videoExt } from "../constants/BackgroundFileTypeExt";
import LoopedOffthreadVideoContainer from "./LoopedOffthreadVideoContainer";
import { getVideoMetadata } from "@remotion/media-utils";
import { useEffect, useState } from "react";

enum BackgroundType {
  Dissupport = "dissupport",
  Img = "img",
  Video = "video",
}

function getFileType(ext: string) {
  if (imgExt.includes(ext)) return BackgroundType.Img;
  if (videoExt.includes(ext)) return BackgroundType.Video;
  return BackgroundType.Dissupport;
}

function getStyle(type: BackgroundType) {
  if (type === BackgroundType.Img) return { transform: "translateY(-18%)" };
  if (type === BackgroundType.Video) return { width: "100%" };
  return { fontSize: "120px", color: "black" };
}

const Background: React.FC<{
  fileName: string;
}> = ({ fileName }) => {
  let fileType = BackgroundType.Dissupport;
  const ext = fileName.split(".").pop();
  if (ext) {
    fileType = getFileType(ext);
  }

  const [durationInSeconds, setDurationInSeconds] = useState(1);
  useEffect(() => {
    if (fileType === BackgroundType.Video) {
      const getDurationInSeconds = async () => {
        const { durationInSeconds } = await getVideoMetadata(fileName);
        setDurationInSeconds(durationInSeconds);
      };
      getDurationInSeconds();
    }
  }, [fileName]);

  const bgStyle = getStyle(fileType);
  let content = <div style={bgStyle}>This file format is not support.</div>;

  if (fileType === BackgroundType.Video) {
    content = (
      <LoopedOffthreadVideoContainer durationInSeconds={durationInSeconds}>
        <OffthreadVideo muted style={bgStyle} src={fileName} />
      </LoopedOffthreadVideoContainer>
    );
  }
  if (fileType === BackgroundType.Img) {
    content = <Img style={bgStyle} src={fileName} />;
  }
  return <AbsoluteFill>{content}</AbsoluteFill>;
};

export default Background;
