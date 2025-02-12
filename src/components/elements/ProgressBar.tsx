import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export interface ProgressBarProps {
  progress: number; // Current progress percentage (0-100)
  label?: string; // Optional label to display above the progress bar
  height?: string; // Optional height of the progress bar
  className?: string; // Optional additional styling for the progress bar
}

export const ProgressBar = ({
  progress,
  label,
  height = "4px",
  className = "",
}: ProgressBarProps) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && <p className="text-sm text-gray-600">{label}</p>}
      <div className="w-full rounded-full bg-gray-200" style={{ height }}>
        <div
          className="rounded-full bg-blue-500"
          style={{
            width: `${progress}%`,
            height,
          }}
        ></div>
      </div>
      <p className="text-right text-xs text-gray-500">{progress}%</p>
    </div>
  );
};

export function ProgressbarCircular({ imageFileUploadProgress }: any) {
  return (
    <CircularProgressbar
      value={imageFileUploadProgress || 0}
      text={`${imageFileUploadProgress}%`}
      strokeWidth={5}
      styles={{
        root: {
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        },
        path: {
          stroke: `rgba(249, 115, 22, ${imageFileUploadProgress / 100})`,
        },
        text: {
          fill: "#f97316",
          fontSize: "1.5rem",
        },
      }}
    />
  );
}
