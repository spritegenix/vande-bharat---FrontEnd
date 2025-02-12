import React from "react";

const TextWithLineBreak = ({ text }: { text: string }) => {
  if (!text) return null;

  return (
    <>
      {text?.split("\\n").map((line: string, index: number) => (
        <React.Fragment key={index}>
          {line}
          {index < text?.split("\\n").length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
};

export default TextWithLineBreak;

export const TextWithoutLineBreak = ({ text }: { text: string }) => {
  if (!text) return null;

  return (
    <>
      {text?.split("\\n").map((line: string, index: number) => (
        <React.Fragment key={index}>
          {line}
          {index < text?.split("\\n").length - 1 && ""}
        </React.Fragment>
      ))}
    </>
  );
};
