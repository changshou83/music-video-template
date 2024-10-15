import { AbsoluteFill, Img } from "remotion";
import { imgExt } from "../constants/BackgroundFileTypeExt";

enum BackgroundType {
  Dissupport = "dissupport",
  Img = "img",
}

function getFileType(ext: string) {
  if (imgExt.includes(ext)) return BackgroundType.Img;
  return BackgroundType.Dissupport;
}

function getStyle(type: BackgroundType) {
  if (type === BackgroundType.Img) return { transform: "translateY(-18%)" };
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

  const bgStyle = getStyle(fileType);
  let content = <div style={bgStyle}>This file format is not support.</div>;

  if (fileType === BackgroundType.Img) {
    content = <Img style={bgStyle} src={fileName} />;
  }
  return <AbsoluteFill>{content}</AbsoluteFill>;
};

export default Background;
