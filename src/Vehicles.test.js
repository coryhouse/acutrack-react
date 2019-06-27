import React from "react";
import Vehicles from "./Vehicles";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Vehicles", () => {
  it("should call delete click handler when delete is clicked", () => {
    // arrange
    const vehicles = [{ id: 1, make: "Ford", model: "Edge" }];
    const onDeleteClick = jest.fn(); // make a fake function that we can monitor to see if it's called.

    // act
    const { getByText } = render(
      <MemoryRouter>
        <Vehicles
          vehicles={vehicles}
          isLoading={false}
          onDeleteClick={onDeleteClick}
        />
      </MemoryRouter>
    );

    const deleteButton = getByText("Delete");
    fireEvent.click(deleteButton);

    // assert
    expect(onDeleteClick).toHaveBeenCalledTimes(1);
    expect(onDeleteClick).toHaveBeenCalledWith(vehicles[0].id);
  });
});
