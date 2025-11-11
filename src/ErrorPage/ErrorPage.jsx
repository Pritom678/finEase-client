import React from "react";
import ErrImg from "../assets/videoframe_9951-removebg-preview_upscayl_5x_digital-art-4x.png";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className=" bg-base-200 h-[600px]">
      <div className="flex flex-col justify-center items-center h-100vh w-full">
        <img src={ErrImg} className="min-h-full w-1/2" alt="error" />
        <Link to="/home" className="text-primary underline text-lg">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
