import React from "react";

const Menu = () => {
  return (
    <button className="p-1.5 hover:bg-info transition duration-200 hover:shadow rounded md:hidden">
      <svg
        width="20"
        height="13"
        viewBox="0 0 20 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.9 8H2.1C0.6 8 0 8.37647 0 9.31176V11.6882C0 12.6235 0.6 13 2.1 13H17.9C19.4 13 20 12.6235 20 11.6882V9.31176C20 8.37647 19.4 8 17.9 8Z"
          fill="#45464B"
        />
        <path
          opacity="0.4"
          d="M10.9 0H2.1C0.6 0 0 0.376471 0 1.31176V3.68824C0 4.62353 0.6 5 2.1 5H10.9C12.4 5 13 4.62353 13 3.68824V1.31176C13 0.376471 12.4 0 10.9 0Z"
          fill="#45464B"
        />
      </svg>
    </button>
  );
};

export default Menu;
