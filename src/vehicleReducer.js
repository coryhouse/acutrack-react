export function vehicleReducer(state, action) {
  switch (action.type) {
    case "load":
      return action.vehicles;
    case "add":
      return [...state, action.vehicle];
    case "edit":
      // Iterate over vehicles, and replace the savedVehicle in the array.
      return state.map(vehicle =>
        vehicle.id === action.vehicle.id ? action.vehicle : vehicle
      );
    case "delete":
      return state.filter(vehicle => vehicle.id !== action.vehicleId);

    default:
      throw new Error("Unknown action type:" + action.type);
  }
}
