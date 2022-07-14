import React, { FC, useRef, useState } from "react";
import Close from "@components/icons/Close";

const Modal: FC<modalInterface> = ({
  toggleModalState,
  children,
  extendedClasses,
}) => {
  return (
    <>
      {" "}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-screen w-screen backdrop-blur-sm"></div>
      <div
        className={`grid place-items-center gap-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90%,40rem)] p-4 sm:aspect-[1.5/1] rounded-lg bg-white text-center ${extendedClasses}`}
      >
        <Close
          handleClick={() => toggleModalState()}
          extendedClasses="absolute top-4 left-4 cursor-pointer"
        />
        {children}
      </div>
    </>
  );
};

export default Modal;

export interface modalInterface {
  toggleModalState: () => void;
  children: React.ReactNode;
  extendedClasses?: string;
}
