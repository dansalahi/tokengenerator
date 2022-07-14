import React, { FC, useRef, useState } from "react";
import { CloseIcon } from "@components/icons";

const NetworksModal: FC<modalInterface> = ({
  toggleModalState,
  children,
  extendedClasses,
}) => {
  return (
    <>
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-screen w-screen backdrop-blur-sm"
        onClick={toggleModalState}
      ></div>
      <div className="flex flex-col w-11/12 max-w-sm gap-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 sm:p-5 rounded-lg bg-[#f4f8ff] shadow-lg h-fit max-h-screen overflow-y-auto">
        <div className="flex items-center gap-2 text-body-4 font-medium mb-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 15.5C15 19.09 12.09 22 8.5 22C4.91 22 2 19.09 2 15.5C2 11.91 4.91 9 8.5 9C8.67 9 8.84999 9.01 9.01999 9.02C12.19 9.27 14.73 11.81 14.98 14.98C14.99 15.15 15 15.33 15 15.5Z"
              fill="#356AF0"
            />
            <path
              opacity="0.4"
              d="M22 8.5C22 12.09 19.09 15 15.5 15C15.33 15 15.15 14.99 14.98 14.98C14.73 11.81 12.19 9.27 9.01999 9.02C9.00999 8.85 9 8.67 9 8.5C9 4.91 11.91 2 15.5 2C19.09 2 22 4.91 22 8.5Z"
              fill="#356AF0"
            />
            <path
              d="M5.59 2H3C2.45 2 2 2.45 2 3V5.59C2 6.48 3.07999 6.93 3.70999 6.3L6.29999 3.71001C6.91999 3.08001 6.48 2 5.59 2Z"
              fill="#356AF0"
            />
            <path
              d="M18.41 22H21C21.55 22 22 21.55 22 21V18.41C22 17.52 20.92 17.07 20.29 17.7L17.7 20.29C17.08 20.92 17.52 22 18.41 22Z"
              fill="#356AF0"
            />
          </svg>
          <span className="text-type-700">Select your preferred network:</span>
          <CloseIcon
            handleClick={() => toggleModalState()}
            extendedClasses="ml-auto cursor-pointer"
          />
        </div>
        <ul className="space-y-2 mx-auto w-11/12 sm:w-10/12 text-body-4 text-type-500">
          {children}
        </ul>
      </div>
    </>
  );
};

export default NetworksModal;

export interface modalInterface {
  toggleModalState: () => void;
  children: React.ReactNode;
  extendedClasses?: string;
}
