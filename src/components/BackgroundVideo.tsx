"use client";

import React from "react";

interface BackgroundVideoProps {
  src?: string; // Default video source
  height?: string; // Tailwind height class (e.g., "h-1/3", "h-1/2")
  opacity?: string; // Tailwind opacity class (e.g., "opacity-30", "opacity-50")
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  src = "/video/backgroundhero.mp4",
  height = "h-1/3",
  opacity = "opacity-30",
}) => {
  return (
    <div className={`absolute left-0 top-0 -z-10 w-full ${height} overflow-hidden`}>
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div className="absolute inset-0 h-full w-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className={`h-full w-full object-cover ${opacity}`}
          >
            {/* Multiple Video Formats for Compatibility */}
            <source src={src} type="video/mp4; codecs=hvc1" />
            <source src={src} type="video/mp4; codecs=avc1" />
            <source src={src.replace(".mp4", ".webm")} type="video/webm" />
            <source src={src.replace(".mp4", ".ogv")} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default BackgroundVideo;
