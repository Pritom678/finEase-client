import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/lottie.json";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-50">
      <Lottie
        className="min-h-full w-full"
        animationData={animationData}
        loop
        autoplay
      />
    </div>
  );
};

export default Spinner;
