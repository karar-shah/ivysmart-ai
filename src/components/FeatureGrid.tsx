"use client";
import React, { useState } from "react";
import { IoBookOutline } from "react-icons/io5";
import { LuBrain, LuGraduationCap } from "react-icons/lu";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

export default function FeatureGrid() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="p-4  bg-emerald-50 rounded-t-lg">
      {/* Expand/Collapse Button for Mobile/Tablet */}
      <div className="md:hidden flex justify-center items-center">
        <button
          onClick={toggleExpand}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-white shadow transition hover:bg-emerald-100 active:bg-emerald-200"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center space-x-2">
            <LuBrain className="h-6 w-6 text-emerald-600" />
            <span className="text-lg font-semibold text-emerald-700">
              Features
            </span>
          </div>
          <span className="flex items-center">
            <span className="text-xs text-emerald-500 mr-2">
              {/* {isExpanded ? "Hide" : "Show"} */}
            </span>
            <span
              className={`transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              <IoChevronDown className="h-5 w-5 text-emerald-600" />
            </span>
          </span>
        </button>
      </div>

      {/* Features Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 transition-all duration-300 ${
          isExpanded ? "max-h-screen" : "max-h-0 overflow-hidden"
        } md:max-h-none md:overflow-visible`}
      >
        {features.map(({ title, description, Icon }, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm"
          >
            <Icon className="h-6 w-6 text-emerald-600" />
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type Feature = {
  title: string;
  description: string;
  Icon: React.FC<{ className?: string }>;
};

const features: Feature[] = [
  {
    title: "Expert Tutoring",
    description: "All education levels",
    Icon: LuGraduationCap,
  },
  {
    title: "Multiple Subjects",
    description: "Comprehensive coverage",
    Icon: IoBookOutline,
  },
  {
    title: "AI-Powered",
    description: "Intelligent assistance",
    Icon: LuBrain,
  },
];
