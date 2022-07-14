import React, { FC } from "react";

const ErrorAlert: FC<errorAlertInterface> = ({ message, type }) => {
  return <div className="fix">{message}</div>;
};

export default ErrorAlert;

export interface errorAlertInterface {
  message: string;
  type: string;
}
