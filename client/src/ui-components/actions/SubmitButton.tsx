import * as React from "react";

import "./SubmitButton.css";

export interface ISubmitButtonProps {
  label: string;
  className?: string;
}

const SubmitButton = (props: ISubmitButtonProps) => {
  return (
    <button type="submit" className={`${props.className} accept submit button`}>
      {props.label}
    </button>
  );
};

export default SubmitButton;
