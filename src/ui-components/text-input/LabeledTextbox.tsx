import * as React from "react";

import "./LabeledTextbox.css";

export interface ILabeledTextboxProps {
  id: string;
  label: string;
  value?: any;
  required?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabeledTextbox = (props: ILabeledTextboxProps) => {
  return (
    <div className={`labeled-textbox ${props.className}`}>
      <label htmlFor={props.id}>{props.label}:</label>
      <input
        id={props.id}
        type="text"
        value={props.value}
        // tslint:disable-next-line:jsx-no-lambda
        onChange={props.onChange}
        // onChange={event => this.onIntSettingChange(event, "boardHeight")}
        required={props.required}
      />
    </div>
  );
};

export default LabeledTextbox;
