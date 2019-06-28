import React, { useState } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";
import TextInput from "../src/TextInput";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

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
