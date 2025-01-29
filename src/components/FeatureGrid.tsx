import React from "react";
import { IoBookOutline } from "react-icons/io5";
import { LuBrain, LuGraduationCap } from "react-icons/lu";

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-emerald-50 rounded-t-lg">
      {features.map(({ title, description, Icon }, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm"
        >
          <Icon className="h-6 w-6 text-emerald-600" />{" "}
          {/* Tailwind applied properly */}
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

type Feature = {
  title: string;
  description: string;
  Icon: React.FC<{ className?: string }>; // Accepts className prop
};

const features: Feature[] = [
  {
    title: "Expert Tutoring",
    description: "All education levels",
    Icon: LuGraduationCap, // Pass icon directly instead of a function
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
