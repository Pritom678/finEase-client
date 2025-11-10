import React from "react";
import Header from "../Components/Header";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>

      <Toaster/>
    </div>
  );
};

export default MainLayout;
