import { useIvyStore } from "@/stores/ivyStore";
import React, { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const TrashIcon = () => <FaRegTrashAlt />;

const FileViewer = () => {
  const { updateFileIds } = useIvyStore();
  const [files, setFiles] = useState<
    { file_id: string; filename: string; status: string }[]
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchFiles();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchFiles = async () => {
    const resp = await fetch("/api/assistants/files", {
      method: "GET",
    });
    const data = await resp.json();
    console.log("assistants/files::GET", data);
    setFiles(data);
  };

  const handleFileDelete = async (fileId: string) => {
    await fetch("/api/assistants/files", {
      method: "DELETE",
      body: JSON.stringify({ fileId }),
    });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const data = new FormData();
    if (event.target.files!.length < 0) return;
    data.append("file", event.target.files![0]);
    const file = await fetch("/api/assistants/files", {
      method: "POST",
      body: data,
    });
    // const file_ = await file.json();

    // if (file_.file_id) {
    //   fetchFiles();
    //   updateFileIds(file_.file_id);
    // }
    // console.log("assistant/files::POST", file_);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full max-md:p-3 p-5 bg-[#efefef] overflow-hidden rounded-[16px] max-w-md flex-1 min-w-[200px] ">
      <div
        className={`overflow-y-auto p-2 flex flex-col gap-3 items-center w-full ${
          files.length !== 0 ? "flex-grow" : ""
        }`}
      >
        {files.length === 0 ? (
          <div className="text-[1.2em] font-semibold">
            Attach files for chat
          </div>
        ) : (
          files.map((file) => (
            <div
              key={file.file_id}
              className="flex justify-between items-center border-b border-[#ececf1] gap-4 w-full"
            >
              <div className="w-full flex flex-col flex-grow">
                <span className="w-full flex flex-col">{file.filename}</span>
                <span className="text-[0.8em] text-[#666]">{file.status}</span>
              </div>
              <span
                onClick={() => handleFileDelete(file.file_id)}
                className="cursor-pointer"
              >
                <TrashIcon />
              </span>
            </div>
          ))
        )}
      </div>
      <div className="p-2 flex justify-center">
        <label
          htmlFor="file-upload"
          className="bg-emerald-700 text-white px-6 py-2 rounded-[32px] text-center inline-block cursor-pointer"
        >
          Attach files
        </label>
        <input
          type="file"
          id="file-upload"
          name="file-upload"
          className="hidden"
          multiple
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
};

export default FileViewer;
