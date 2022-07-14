import React, { FC } from "react";

const FormGroup: FC<formGroupInterface> = ({
  title,
  id,
  children,
  extendClasses,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {title && <h3>{title}</h3>}
      <div className={extendClasses} role="group">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { name: id });
          }
          return child;
        })}
      </div>
    </div>
  );
};

export default FormGroup;

export interface formGroupInterface {
  title?: string;
  id: string;
  children: React.ReactNode;
  extendClasses?: string;
}
