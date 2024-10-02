import React, { ReactNode } from "react";
import { FieldError } from "react-hook-form";

interface FieldProps {
  label?: string;
  children: ReactNode;
  htmlFor?: string;
  error?: FieldError;
}
const Field = ({ label, children, htmlFor, error }: FieldProps) => {
  const id = htmlFor || getChildId(children);
  return (
    <div className="form-control">
      {label && (
        <label htmlFor={id} className="auth-label">
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <div role="alert" className="text-red-600">
          {error.message}
        </div>
      )}
    </div>
  );
};

const getChildId = (children: ReactNode) => {
  const child = React.Children.only(children) as React.ReactElement;

  if ("id" in child?.props) {
    return child?.props?.id;
  }
};

export default Field;
