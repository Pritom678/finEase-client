import React from "react";
import Header from "../Components/Header";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import { Toaster } from "react-hot-toast";
import bgImg from "../assets/buildings-1762801593716.png";

const MainLayout = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main className={`bg-[url('${bgImg}')] mx-auto`}>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>

      <Toaster />
    </div>
  );
};

export default MainLayout;
