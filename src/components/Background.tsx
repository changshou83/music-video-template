import { Img, OffthreadVideo } from "remotion";
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

  if (fileType === BackgroundType.Video) {
    return (
      <LoopedOffthreadVideoContainer durationInSeconds={durationInSeconds}>
        <OffthreadVideo
          muted
          className="cover"
          style={{
            width: "100%",
            zIndex: -1,
            position: "absolute",
          }}
          src={fileName}
        />
      </LoopedOffthreadVideoContainer>
    );
  }
  if (fileType === BackgroundType.Img) {
    return (
      <Img
        className="cover"
        style={{
          width: "100%",
          transform: "translateY(-18%)",
          zIndex: -1,
          position: "absolute",
        }}
        src={fileName}
      />
    );
  }
  return <div>This format is not support.</div>;
};

export default Background;
