import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";

const FullScreenImageDisplay = ({ toggleImage,src }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        toggleImage();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="absolute inset-0">
      <div 
        className="absolute inset-0 z-20 bg-black/70 blur-[6px]  cursor-pointer"
        onClick={toggleImage}
      />

      <X
        onClick={toggleImage}
        size={24}
        className="text-white  bg-white/25 p-1 rounded-[4px] absolute  right-1/10  top-1/4 -translate-y-1/2 z-40 "
      />

      <Image
        className="relative top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30 w-auto h-auto max-w-full max-h-full object-contain pointer-events-none  items-center justify-center"
        src={src}
        width={375}
        height={150}
        alt="question image"
        priority={true}
      />
    </div>
  );
};

export default FullScreenImageDisplay;
