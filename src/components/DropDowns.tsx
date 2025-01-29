"use client";
import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button, Card, CardBody } from "@heroui/react";
import { FaAngleDown } from "react-icons/fa";
// import { MessageCircle } from "lucide-react";

export default function StudentSelection() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const schoolLevels = [
    { key: "kindergarten", label: "Kindergarten" },
    { key: "elementary", label: "Elementary School" },
    { key: "middle", label: "Middle School" },
    { key: "high", label: "High School" },
    { key: "undergraduate", label: "Undergraduate" },
    { key: "graduate", label: "Graduate School" },
  ];
  const subjects = [
    { key: "science", label: "Science" },
    { key: "math", label: "Mathematics" },
    { key: "history", label: "History" },
    { key: "literature", label: "Literature" },
    { key: "language", label: "Language" },
    { key: "other", label: "Other" },
  ];
  const subject_disabled = [
    "science",
    "history",
    "literature",
    "language",
    "other",
  ];
  const school_level_disabled = [
    "kindergarten",
    "elementary",
    "high",
    "undergraduate",
    "graduate",
  ];

  const handleConfirm = () => {
    if (selectedLevel && selectedSubject) {
      setConfirmed(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5 w-full">
      {!confirmed ? (
        <Card className="w-full max-w-lg p-6 bg-white shadow-xl rounded-2xl">
          <CardBody className="flex flex-col items-center space-y-6 w-full">
            <h2 className="text-2xl font-semibold text-emerald-700 text-center pb-5">
              Select Your School Level & Subject
            </h2>

            {/* Responsive Container for Dropdowns */}
            <div className="flex flex-col sm:flex-row w-full gap-3">
              {/* School Level Dropdown */}
              <Dropdown backdrop="blur">
                <DropdownTrigger>
                  <Button
                    variant="flat"
                    className="p-4 w-full sm:w-72 flex justify-between"
                  >
                    <span className="text-md font-medium font-sans">
                      {selectedLevel
                        ? schoolLevels.find((lvl) => lvl.key === selectedLevel)
                            ?.label
                        : "Choose School Level"}
                    </span>
                    <FaAngleDown className="text-gray-700 h-5 w-5" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="School Levels"
                  variant="faded"
                  onAction={(key) => setSelectedLevel(key as string)}
                  disabledKeys={school_level_disabled}
                >
                  {schoolLevels.map((level) => (
                    <DropdownItem key={level.key}>{level.label}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              {/* Subject Dropdown */}
              <Dropdown backdrop="blur">
                <DropdownTrigger>
                  <Button
                    variant="flat"
                    className="p-4 w-full sm:w-72 flex justify-between"
                  >
                    <span className="text-md font-medium font-sans">
                      {selectedSubject
                        ? subjects.find((sub) => sub.key === selectedSubject)
                            ?.label
                        : "Choose Subject"}
                    </span>
                    <FaAngleDown className="text-gray-700 h-5 w-5" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Subjects"
                  variant="faded"
                  onAction={(key) => setSelectedSubject(key as string)}
                  disabledKeys={subject_disabled}
                >
                  {subjects.map((subject) => (
                    <DropdownItem key={subject.key}>
                      {subject.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>

            {/* Confirm Button */}
            <button
              className="w-fit  px-6 py-2 bg-emerald-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-emerald-700 transition"
              onClick={handleConfirm}
              disabled={!selectedLevel || !selectedSubject}
            >
              Start Learning
            </button>
          </CardBody>
        </Card>
      ) : (
        <Card className="w-full max-w-lg p-6 bg-emerald-50  shadow-lg rounded-xl">
          <CardBody className="flex flex-col items-center space-y-5">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
              {/* <MessageCircle className="h-6 w-6 text-emerald-700" /> */}
              <span>AI Study Assistant</span>
            </h2>
            <p className="text-gray-600 text-center">
              You selected <b>{selectedLevel}</b> - <b>{selectedSubject}</b>.
              Start asking questions or practicing with AI!
            </p>
            {/* Placeholder for Chat UI */}
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chat UI will go here...</p>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
