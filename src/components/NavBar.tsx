import React from "react";
import { LuBrain } from "react-icons/lu";

export default function NavBar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <LuBrain className="h-8 w-8 text-emerald-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">IvySmart AI</h1>
        </div>

        {/* Sign Out Button */}
        <div className="flex items-center space-x-4">
          <button className="text-sm text-gray-600 hover:text-gray-900 border-gray-100 border px-4 py-2 rounded-full shadow-md">
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
