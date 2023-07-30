import ContentPlay from "@/components/play/contentPlay";
import React from "react";

const PlayPage = () => {
  return (
    <div className={`h-screen flex flex-col justify-center items-center`}>
        <div>
            <ContentPlay />
        </div>
    </div>
  );
};

export default PlayPage;
