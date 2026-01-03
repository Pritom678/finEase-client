import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router";
import {
  Menu,
  X,
  Home,
  PlusCircle,
  List,
  BarChart3,
  User,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";

// Dummy user data - replace with real auth context later

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const location = useLocation();
  const { user, signOutUser } = use(AuthContext);

  // Apply theme to <html> using data-theme (DaisyUI style)

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const menuItems = [
    { path: "/dashboard", label: "Overview", icon: Home },
    {
      path: "/dashboard/add-transaction",
      label: "Add Transaction",
      icon: PlusCircle,
    },
    { path: "/dashboard/my-transaction", label: "My Transactions", icon: List },
    { path: "/dashboard/reports", label: "Reports", icon: BarChart3 },
    { path: "/dashboard/profile", label: "Profile", icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 dark:from-gray-900 dark:via-[#0f172a] dark:to-gray-900">
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Fixed Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-2xl transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 rounded-r-3xl
        `}
        >
          <div className="flex flex-col h-full">
            <div className="h-16 flex items-center justify-between px-6 border-b dark:border-gray-700">
              <Link
                to={"/"}
                className="text-2xl font-bold text-teal-600 dark:text-teal-400"
              >
                FinEase
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-600 dark:text-gray-400"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`group relative flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-md
                      ${
                        isActive(item.path)
                          ? "bg-teal-100/50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                      }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-64">
          {/* Top Navbar */}
          <header className="sticky top-0 z-40 h-16 bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
            <div className="h-full flex items-center justify-between px-6">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 dark:text-gray-300"
              >
                <Menu size={24} />
              </button>

              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Dashboard
              </h1>

              {/* Right Side: Theme Toggle + Profile */}
              <div className="flex items-center gap-4">
                {/* Theme Toggle - DaisyUI style toggle */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
                    Dark Mode
                  </span>
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    checked={theme === "dark"}
                    onChange={(e) => handleTheme(e.target.checked)}
                  />
                </label>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500"
                      />
                    ) : (
                      <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        (user.name)
                      </div>
                    )}
                    <ChevronDown
                      size={16}
                      className="text-gray-600 dark:text-gray-400"
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 py-2">
                      <div className="px-4 py-3 border-b dark:border-gray-700">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        to="/dashboard/profile"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <User size={18} />
                        Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <Home size={18} />
                        Dashboard Home
                      </Link>
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20 text-left">
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Main Page Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
            <Outlet />
          </main>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
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

export default DashboardLayout;
