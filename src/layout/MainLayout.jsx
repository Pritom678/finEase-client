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
      <main className="mx-auto">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>

      <Toaster
        position="top-right" // ← This ensures top-right corner
        reverseOrder={false}
        gutter={12}
        containerStyle={{
          top: "80px", // Optional: add space below navbar
          right: "20px",
        }}
        toastOptions={{
          duration: 5000,
          style: {
            borderRadius: "16px",
            padding: "16px 20px",
            fontWeight: "600",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15)",
          },
          // Default styles for types
          success: {
            style: { background: "#14b8a6", color: "white" },
            icon: "✅",
          },
          error: {
            style: { background: "#ef4444", color: "white" },
            icon: "❌",
          },
          loading: {
            style: { background: "#1e293b", color: "white" },
          },
        }}
      />
    </div>
  );
};

export default MainLayout;
