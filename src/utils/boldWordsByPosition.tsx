import React from "react";

interface BoldWordsProps {
  text: string;
  positions: number[];
}

export const BoldWordsByPosition: React.FC<BoldWordsProps> = ({
  text,
  positions,
}) => {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, index) => (
        <React.Fragment key={index}>
          {positions.includes(index) ? (
            <span className="font-bold">{word}</span>
          ) : (
            word
          )}{" "}
        </React.Fragment>
      ))}
    </>
  );
};

// <BoldWords text={text} positions={positions} />
