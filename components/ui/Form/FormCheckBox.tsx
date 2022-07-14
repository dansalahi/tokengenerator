import React, { FC } from "react";
import { Formik, Field, Form } from "formik";

const FormCheckBox: FC<formCheckInterface> = ({
  name,
  label,
  value,
  hasDescription = false,
  toolTipMessage,
  isChecked = true,
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-2 w-max">
      <label className={`flex items-center gap-2 capitalize cursor-pointer`}>
        <Field
          type="checkbox"
          name={name}
          value={value}
          className="relative grid place-content-center appearance-none h-[0.75rem] 
          rounded-sm aspect-square bg-[#f0f5ff] after:absolute after:top-0 after:left-0 after:grid after:place-content-center 
          after:w-full after:h-full after:rounded-sm after:text-[1rem] after:text-white after:bg-primary after:scale-0 checked:after:scale-100
          after:transition-transform after:duration-75 after:bg-no-repeat after:bg-center after:bg-[length:75%] cursor-pointer"
        />
        {label}
      </label>
      {hasDescription && (
        <div className="relative group">
          <svg
            viewBox="0 0 10 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full max-h-5 w-full cursor-pointer"
          >
            <circle
              cx="4.76667"
              cy="6.50007"
              r="4.76667"
              fill="#E9F0FF"
              className="transition group-hover:fill-primary"
            />
            <path
              d="M4.69601 3.36C5.24001 3.36 5.67467 3.50933 6.00001 3.808C6.33067 4.10667 6.49601 4.51467 6.49601 5.032C6.49601 5.57067 6.32534 5.976 5.98401 6.248C5.64267 6.52 5.18934 6.656 4.62401 6.656L4.59201 7.288H3.80001L3.76001 6.032H4.02401C4.54134 6.032 4.93601 5.96267 5.20801 5.824C5.48534 5.68533 5.62401 5.42133 5.62401 5.032C5.62401 4.74933 5.54134 4.528 5.37601 4.368C5.21601 4.208 4.99201 4.128 4.70401 4.128C4.41601 4.128 4.18934 4.20533 4.02401 4.36C3.85867 4.51467 3.77601 4.73067 3.77601 5.008H2.92001C2.92001 4.688 2.99201 4.40267 3.13601 4.152C3.28001 3.90133 3.48534 3.70667 3.75201 3.568C4.02401 3.42933 4.33867 3.36 4.69601 3.36ZM4.18401 9.056C4.01867 9.056 3.88001 9 3.76801 8.888C3.65601 8.776 3.60001 8.63733 3.60001 8.472C3.60001 8.30667 3.65601 8.168 3.76801 8.056C3.88001 7.944 4.01867 7.888 4.18401 7.888C4.34401 7.888 4.48001 7.944 4.59201 8.056C4.70401 8.168 4.76001 8.30667 4.76001 8.472C4.76001 8.63733 4.70401 8.776 4.59201 8.888C4.48001 9 4.34401 9.056 4.18401 9.056Z"
              fill="#45464B"
              className="transition group-hover:fill-white"
            />
          </svg>
          <div className="absolute font-extralight -top-1/3 -translate-y-full left-1/2 -translate-x-1/2 w-max max-w-[200px] text-left z-10 bg-white border p-3 rounded text-[10px] leading-4 shadow-sm transition-all invisible opacity-0 group-hover:visible group-hover:opacity-100 empty:hidden text-slate-600">
            {toolTipMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormCheckBox;

export interface formCheckInterface {
  name?: string;
  label: string;
  value?: string;
  hasDescription?: boolean;
  toolTipMessage?: string;
  isChecked?: boolean;
}
