import React from "react";
import Sparkles from "react-sparkle";

export default function Home() {
  return (
    <div className="flex column center relative coverPage">
      <Sparkles
        count={15}
        minSize={2}
        maxSize={8}
        overflowPx={0}
        fadeOutSpeed={4}
        flicker={true}
        flickerSpeed={"slower"}
      />
      Home
    </div>
  );
}
