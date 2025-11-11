import React from "react";
import Lottie from "lottie-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <DotLottieReact
        className="min-h-full w-full"
        src="https://lottie.host/ffc685b2-b9e3-411d-84ac-43e13cea66af/c8SpGD1EqR.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export default Spinner;
