import * as React from "react";

import Container from "../../ui-components/containers/Container";
import { IWidgetProps } from "../../ui-components/shared/interfaces";

import "./Header.css";

const Header = (props: IWidgetProps) => {
  return (
    <Container
      {...props as IWidgetProps}
      className={`${props.className} header`}
    >
      {props.children}
    </Container>
  );
};

export default Header;
