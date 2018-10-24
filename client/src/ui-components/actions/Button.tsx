import * as React from "react";

import {
  IWidgetProps,
  MouseEventHandler,
  Omit,
  OmitClassAndChildren
} from "../shared/interfaces";

import "./Button.css";

export interface IButtonProps extends IWidgetProps {
  onClick: MouseEventHandler;
}

type ExtraProps = Omit<OmitClassAndChildren, "onClick">;

const Button = (props: IButtonProps) => {
  return (
    <button
      {...props as ExtraProps}
      className={`${props.className} button`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
