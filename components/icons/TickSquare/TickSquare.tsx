import React, { FC } from "react";

const TickSquare: FC<tickSquareInterface> = ({
  fill = "#356AF0",
  extendedClasses,
}) => {
  return (
    <div className={`w-4 ${extendedClasses}`}>
      <svg
        className="w-full h-full"
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.8171 1.58325H6.1829C3.30123 1.58325 1.58331 3.30117 1.58331 6.18284V12.8091C1.58331 15.6987 3.30123 17.4166 6.1829 17.4166H12.8091C15.6908 17.4166 17.4087 15.6987 17.4087 12.817V6.18284C17.4166 3.30117 15.6987 1.58325 12.8171 1.58325ZM13.2841 7.67908L8.7954 12.1678C8.68456 12.2787 8.53415 12.342 8.37581 12.342C8.21748 12.342 8.06706 12.2787 7.95623 12.1678L5.71581 9.92742C5.48623 9.69783 5.48623 9.31783 5.71581 9.08825C5.9454 8.85867 6.3254 8.85867 6.55498 9.08825L8.37581 10.9091L12.445 6.83992C12.6746 6.61034 13.0546 6.61034 13.2841 6.83992C13.5137 7.0695 13.5137 7.44159 13.2841 7.67908Z"
          fill={fill}
        />
      </svg>
    </div>
  );
};

export default TickSquare;

export interface tickSquareInterface {
  extendedClasses?: string;
  fill?: string;
}
