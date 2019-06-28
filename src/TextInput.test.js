import React from "react";
import { render, cleanup } from "@testing-library/react";
import TextInput from "./TextInput";
import renderer from "react-test-renderer";

afterEach(cleanup);

describe("TextInput", () => {
  it("should display an error message when an error is provided on props", () => {
    // arrange
    const mockOnChange = jest.fn();

    // act
    const { getByText } = render(
      <TextInput
        error="Example error"
        label=""
        id=""
        value=""
        name=""
        onChange={mockOnChange}
      />
    );

    // assert
    getByText("Example error");
  });

  it("should contain a br tag", () => {
    // arrange

    // act
    const { getByTestId } = render(
      <TextInput label="" id="" value="" name="" onChange={jest.fn()} />
    );

    // assert
    getByTestId("break");
  });

  it("should not render an error when an error isn't passed", () => {
    const tree = renderer
      .create(
        <TextInput
          label="Example label"
          id="ID"
          value="Example value"
          name="name"
          onChange={() => {}}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should render an error when passed an error", () => {
    const tree = renderer
      .create(
        <TextInput
          label="Example label"
          id="ID"
          error="Example error"
          value="Example value"
          name="name"
          onChange={() => {}}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
