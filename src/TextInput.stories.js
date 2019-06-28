import React, { useState } from "react";
import TextInput from "./TextInput";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

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
  // Add the `withKnobs` decorator to add knobs support to your stories.
  // You can also configure `withKnobs` as a global decorator.
  .addDecorator(withKnobs)
  .add("default", () => (
    <ExampleTextInput
      label={text("Label", "Example label")}
      error={text("Error", null)}
    />
  ))
  .add("no label", () => <ExampleTextInput />)
  .add("with error", () => <ExampleTextInput error="Example error" />);
