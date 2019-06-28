import React, { useState } from "react";
import TextInput from "./TextInput";
import { storiesOf } from "@storybook/react";

function ExampleTextInput(props) {
  const [value, setValue] = useState("");

  return (
    <TextInput
      label={props.label}
      onChange={event => setValue(event.target.value)}
      value={value}
      name="example"
      id="example"
      error={props.error}
    />
  );
}

storiesOf("TextInput", module)
  .add("default", () => <ExampleTextInput label="Example label" />)
  .add("no label", () => <ExampleTextInput />)
  .add("with error", () => <ExampleTextInput error="Example error" />);
