import * as React from "react";
import { IWidgetProps, OmitClassAndChildren } from "../shared/interfaces";

import "./Container.css";

const Container = (props: IWidgetProps) => {
  return (
    <div
      {...props as OmitClassAndChildren}
      className={`${props.className} container`}
    >
      {props.children}
    </div>
  );
};

export default Container;
