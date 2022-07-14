import React, { FC } from "react";

const List: FC<listInterface> = ({ children }) => {
  return <ul className="flex flex-col gap-7 ml-4">{children}</ul>;
};

export default List;

export interface listInterface {
  children: React.ReactNode;
}
