import React, { FC } from "react";
import classNames from "classnames";

const Container: FC<containerInterface> = ({
  children,
  extendClasses = "",
}) => {
  const containerStyles = classNames(
    "w-full rounded-lg bg-white px-4 py-3 md:px-8 flex relative mx-auto custom-shadow-1 max-w-",
    extendClasses
  );

  return <section className={containerStyles}>{children}</section>;
};

export default Container;

export interface containerInterface {
  children: React.ReactNode;
  extendClasses?: string;
}
