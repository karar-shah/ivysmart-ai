"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button, Card, CardBody } from "@heroui/react";
import { FaAngleDown } from "react-icons/fa";
import { useIvyStore } from "@/stores/ivyStore";
import {
  school_level_disabled,
  schoolLevels,
  subject_disabled,
  subjects,
} from "@/const/const";
import { Toaster, toast } from "sonner";

export default function StudentSelection() {
  const { uiState, DropDownOption, updateUiState, updateDropDownOption } =
    useIvyStore();

  const handleConfirm = () => {
    // console.log("DropDownOption");
    if (DropDownOption.school_level && DropDownOption.subject) {
      updateUiState("chat");
    } else {
      // console.log("toast");
      toast.warning("Select School Level and Subject");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center md:mt-5 w-full">
      {uiState === "dropzone" ? (
        <Card className="w-full max-w-lg p-6 bg-white shadow-xl rounded-2xl md:mt-2 animate-fade">
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
                      {DropDownOption.school_level
                        ? schoolLevels.find(
                            (lvl) => lvl.key === DropDownOption.school_level
                          )?.label
                        : "Choose School Level"}
                    </span>
                    <FaAngleDown className="text-gray-700 h-5 w-5" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="School Levels"
                  variant="faded"
                  onAction={(value) =>
                    updateDropDownOption("school_level", value as string)
                  }
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
                      {DropDownOption.subject
                        ? subjects.find(
                            (sub) => sub.key === DropDownOption.subject
                          )?.label
                        : "Choose Subject"}
                    </span>
                    <FaAngleDown className="text-gray-700 h-5 w-5" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Subjects"
                  variant="faded"
                  onAction={(value) =>
                    updateDropDownOption("subject", value as string)
                  }
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
              className="w-fit  px-6 py-2 bg-emerald-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-emerald-700 transition cursor-pointer "
              onClick={handleConfirm}
              // disabled={!DropDownOption.school_level || !DropDownOption.subject}
            >
              Start Learning
            </button>
          </CardBody>
        </Card>
      ) : null}
      <Toaster />
    </div>
  );
}
