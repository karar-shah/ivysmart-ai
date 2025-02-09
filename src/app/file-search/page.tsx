"use client";
import React from "react";
import styles from "../shared/page.module.css";

import Chat from "../../components/Assistant/chat";
import FileViewer from "../../components/Assistant/file-viewer";

const FileSearchPage = () => {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="max-md:flex-col flex w-full h-screen max-md:items-center">
        <div className="flex flex-col w-fit gap-5 m-5 ">
          <FileViewer />
        </div>
        <div className="flex flex-col items-center w-full h-full bg-white">
          <div className="max-w-2xl w-full h-full">
            <Chat />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FileSearchPage;
