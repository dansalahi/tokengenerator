import Link from "next/link";
import React, { FC } from "react";

const Button: FC<buttonInterface> = ({
  children,
  isLink,
  type = "default",
  variant = "main",
  href = "",
  disabled = false,
  handleClick,
  extendClasses = "",
}) => {
  return (
    <>
      {isLink ? (
        <Link href={href}>
          <a className={extendClasses}>
            <button
              disabled={disabled}
              className={`transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                type === "default"
                  ? "w-full py-2 px-3 rounded-md text-body-4"
                  : ""
              } ${
                variant === "main"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : variant === "transparent"
                  ? "bg-white text-primary hover:bg-slate-100 shadow-custom-1"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              {children}
            </button>
          </a>
        </Link>
      ) : (
        <button
          disabled={disabled}
          onClick={() => handleClick && handleClick()}
          className={`transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${extendClasses} ${
            type === "default"
              ? "w-full h-min py-2.5 px-3 rounded-md text-body-4"
              : ""
          } ${
            variant === "main"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : variant === "transparent"
              ? "bg-white text-primary hover:bg-slate-100 shadow-custom-1"
              : "bg-orange-500 hover:bg-orange-600 text-white sm:col-start-2"
          }`}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;

export interface buttonInterface {
  children: React.ReactNode;
  isLink?: boolean;
  type: "default";
  variant?: "main" | "secondary" | "transparent";
  href?: string;
  disabled?: boolean;
  extendClasses?: string;
  handleClick?: () => void;
}
