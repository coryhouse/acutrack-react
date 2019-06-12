import React, { useState } from "react";
import TextInput from "./TextInput";

function ManageVehicle() {
  const [vehicle, setVehicle] = useState({
    make: "",
    model: ""
  });

  function handleChange(event) {
    const newValue = event.target.value;
    const vehicleCopy = { ...vehicle };
    vehicleCopy[event.target.name] = newValue;
    setVehicle(vehicleCopy);
  }

  return (
    <form>
      <h1>Manage Vehicle</h1>
      <TextInput
        label="Make"
        id="make"
        name="make"
        value={vehicle.make}
        onChange={handleChange}
      />
    </form>
  );
}

export default ManageVehicle;
