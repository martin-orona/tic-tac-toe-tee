import * as React from "react";
import { IWidgetProps, OmitClassAndChildren } from "../shared/interfaces";

import "./ActionBar.css";

const ActionBar = (props: IWidgetProps) => {
  return (
    <div
      {...props as OmitClassAndChildren}
      className={`${props.className} action-bar`}
    >
      {props.children}
    </div>
  );
};

export default ActionBar;
