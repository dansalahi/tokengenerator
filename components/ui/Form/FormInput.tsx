import React, { FC, useState } from "react";
import classNames from "classnames";

const FormInput: FC<formInputInterface> = ({
  id,
  name,
  label,
  type,
  value,
  isRequired = false,
  isDisabled = false,
  extendClasses,
  placeholder = "",
  handleChange,
  isValid = null,
}) => {
  const inputStyles = classNames(
    "flex justify-between bg-info rounded-md focus-within:shadow-border",
    {
      "focus-within:shadow-primary": isValid === null,
      "shadow-border shadow-success focus-within:shadow-success": isValid,
      "shadow-border shadow-danger focus-within:shadow-danger":
        !isValid && isValid !== null,
    },
    extendClasses
  );

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex items-center gap-1 capitalize">
        {label}
        {isRequired && (
          <span>
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.02755 0.672741L5.80498 2.07862C5.9115 2.27159 6.17885 2.4549 6.39869 2.47968L7.7073 2.64418C8.54516 2.74769 8.76124 3.34232 8.19102 3.96516L7.21954 5.0203C7.05737 5.19713 6.97319 5.53446 7.03835 5.76599L7.37873 7.00823C7.64646 7.989 7.13731 8.39552 6.24257 7.91378L4.99266 7.2407C4.76502 7.11765 4.40344 7.13556 4.18958 7.27371L2.99973 8.04386C2.14796 8.59436 1.60595 8.23195 1.79285 7.23339L2.03218 5.96965C2.07686 5.73342 1.96973 5.40378 1.79291 5.24161L0.737772 4.27011C0.118605 3.69778 0.285154 3.08778 1.11022 2.91484L2.39851 2.64574C2.61593 2.59851 2.86789 2.39921 2.95635 2.19643L3.61638 0.728953C3.97136 -0.0632453 4.60783 -0.0881464 5.02755 0.672741Z"
                fill="#F84837"
              />
            </svg>
          </span>
        )}
      </label>
      <div className={`${inputStyles} flex items-center space-x-2`}>
        <input
          placeholder={placeholder}
          type={type}
          id={id}
          name={name}
          value={value}
          disabled={isDisabled}
          className={`w-full bg-transparent p-3 focus-within:outline-none ${
            isDisabled ? "opacity-50" : ""
          }`}
          onChange={handleChange}
        />
        {isValid === null ? (
          <></>
        ) : isValid ? (
          <svg
            className="relative right-2"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0C3.592 0 0 3.592 0 8C0 12.408 3.592 16 8 16C12.408 16 16 12.408 16 8C16 3.592 12.408 0 8 0ZM11.824 6.16L7.288 10.696C7.176 10.808 7.024 10.872 6.864 10.872C6.704 10.872 6.552 10.808 6.44 10.696L4.176 8.432C3.944 8.2 3.944 7.816 4.176 7.584C4.408 7.352 4.792 7.352 5.024 7.584L6.864 9.424L10.976 5.312C11.208 5.08 11.592 5.08 11.824 5.312C12.056 5.544 12.056 5.92 11.824 6.16Z"
              fill="#53D258"
            />
          </svg>
        ) : (
          <svg
            className="relative right-2"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0C3.592 0 0 3.592 0 8C0 12.408 3.592 16 8 16C12.408 16 16 12.408 16 8C16 3.592 12.408 0 8 0ZM10.688 9.84C10.92 10.072 10.92 10.456 10.688 10.688C10.568 10.808 10.416 10.864 10.264 10.864C10.112 10.864 9.96 10.808 9.84 10.688L8 8.848L6.16 10.688C6.04 10.808 5.888 10.864 5.736 10.864C5.584 10.864 5.432 10.808 5.312 10.688C5.08 10.456 5.08 10.072 5.312 9.84L7.152 8L5.312 6.16C5.08 5.928 5.08 5.544 5.312 5.312C5.544 5.08 5.928 5.08 6.16 5.312L8 7.152L9.84 5.312C10.072 5.08 10.456 5.08 10.688 5.312C10.92 5.544 10.92 5.928 10.688 6.16L8.848 8L10.688 9.84Z"
              fill="#F84837"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default FormInput;

export interface formInputInterface {
  id: string;
  name: string;
  type: "text" | "email" | "password" | "number";
  label: string;
  value?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  extendClasses?: string;
  placeholder?: string;
  handleChange: (e: React.ChangeEvent<any>) => any;
  isValid?: boolean;
}
