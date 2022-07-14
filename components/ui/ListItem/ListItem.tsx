import React, { FC } from "react";
import ListItem from ".";

const Item: FC<listItemInterface> = ({ color, children }) => {
  return (
    <li className="flex space-x-1.5 items-start">
      <svg
        className="pt-1 scale-125"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_di_5_206)">
          <path
            d="M8 10C9.65685 10 11 8.65685 11 7C11 5.34315 9.65685 4 8 4C6.34315 4 5 5.34315 5 7C5 8.65685 6.34315 10 8 10Z"
            fill={color}
          />
        </g>
        <defs>
          <filter
            id="filter0_di_5_206"
            x="0"
            y="0"
            width="16"
            height="16"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 0.6 0 0 0 0 0.00392157 0 0 0 0.83 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_5_206"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_5_206"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="0.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect2_innerShadow_5_206"
            />
          </filter>
        </defs>
      </svg>

      <p className="text-type-600 font-light text-body-4">{children}</p>
    </li>
  );
};

export default Item;

export interface listItemInterface {
  color: string;
  children: React.ReactNode;
}
