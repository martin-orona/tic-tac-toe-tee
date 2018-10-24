import * as React from "react";

import "./SubmitButton.css";

export interface ISubmitButtonProps {
  label: string;
  className?: string;
}

const SubmitButton = (props: ISubmitButtonProps) => {
  return (
    <input
      type="submit"
      className={`${props.className} accept submit button`}
      value={props.label}
    />
  );
};

export default SubmitButton;
