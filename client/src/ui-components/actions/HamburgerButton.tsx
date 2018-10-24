import * as React from "react";

import Button, { IButtonProps } from "./Button";

import "./HamburgerButton.css";

const HamburgerButton = (props: IButtonProps) => {
  return (
    <Button
      title="Menu"
      {...props}
      className={`${props.className} hamburger menu button`}
    >
      <div className="line" />
      <div className="line" />
      <div className="line" />
    </Button>
  );
};

export default HamburgerButton;
