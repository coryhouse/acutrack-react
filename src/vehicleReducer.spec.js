import { vehicleReducer } from "./vehicleReducer";

describe("vehicleReducer", () => {
  it("should return the passed list of vehicles when called with a load action type", () => {
    // arrange
    const vehicles = [{ id: 1, make: "Ford", model: "Edge" }];
    const action = { type: "load", vehicles: vehicles };

    // act
    const newState = vehicleReducer([], action);

    // assert
    expect(newState).toEqual(vehicles);
  });

  it("should return the array of vehicles with added vehicle when called with add action type", () => {
    // arrange
    const initialVehicles = [{ id: 1, make: "Ford", model: "Edge" }];
    const vehicleToAdd = { id: 2, make: "Chevy", model: "Nova" };
    const action = { type: "add", vehicle: vehicleToAdd };

    // act
    const newState = vehicleReducer(initialVehicles, action);

    // assert
    expect(newState).toEqual([...initialVehicles, vehicleToAdd]);
  });

  it("should return an array of vehicles with the updated vehicle when called with edit action type", () => {
    // arrange
    const initialVehicles = [
      { id: 1, make: "Ford", model: "Edge" },
      { id: 2, make: "Chevy", model: "Nova" }
    ];
    const vehicleEdit = { id: 2, make: "Chevy", model: "Malibu" };
    const action = { type: "edit", vehicle: vehicleEdit };

    // act
    const newState = vehicleReducer(initialVehicles, action);

    // assert
    expect(newState).toEqual([
      { id: 1, make: "Ford", model: "Edge" },
      { id: 2, make: "Chevy", model: "Malibu" }
    ]);
  });

  it("should return an array of vehicles with the deleted vehicle omitted when called with delete action type", () => {
    // arrange
    const initialVehicles = [
      { id: 1, make: "Ford", model: "Edge" },
      { id: 2, make: "Chevy", model: "Nova" }
    ];
    const action = { type: "delete", vehicleId: 2 };

    // act
    const newState = vehicleReducer(initialVehicles, action);

    // assert
    expect(newState).toEqual([{ id: 1, make: "Ford", model: "Edge" }]);
  });
});
