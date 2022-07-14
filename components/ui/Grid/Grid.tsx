import React, { FC } from "react";

const Grid: FC<gridInterface> = ({
  layout = "A",
  children,
  extendClasses = "",
}) => {
  return (
    <div
      className={`grid ${
        layout === "A"
          ? "landing-grid__a grid-rows-[2fr_1fr] md:grid-rows-3 lg:grid-rows-[unset] lg:grid-cols-4 min-h-screen  bg-[#f8f9fd] mlscreen:grid-rows-[1fr,500px]"
          : "landing-grid__b grid grid-cols-1 gap-x-5 gap-y-5 md:grid-rows-[auto_1fr] max-w-7xl lg:max-h-screen py-4 w-full h-full md:grid-cols-[min-content_1fr] mx-auto text-type-600 text-body-4"
      } ${extendClasses}`}
    >
      {children}
    </div>
  );
};

export default Grid;

export interface gridInterface {
  children: React.ReactNode;
  layout: "A" | "B";
  extendClasses?: string;
}
