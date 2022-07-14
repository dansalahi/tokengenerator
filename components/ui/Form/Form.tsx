import React, { FC } from "react";
import classNames from "classnames";

const Form: FC<formInterface> = ({ children, extendClasses }) => {
  const formStyles = classNames(
    "flex flex-col justify-between gap-5",
    {},
    extendClasses
  );

  return <form className={formStyles}>{children}</form>;
};

export default Form;

export interface formInterface {
  children: React.ReactNode;
  extendClasses?: string;
}
