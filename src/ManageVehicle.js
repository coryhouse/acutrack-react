import React, { useState, useEffect } from "react";
import TextInput from "./TextInput";
import { saveVehicle, getVehicle } from "./api/vehicleApi";
// import produce from "immer";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function ManageVehicle(props) {
  const [vehicle, setVehicle] = useState({
    make: "",
    model: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const { vehicleId } = props.match.params;
    getVehicle(vehicleId).then(_vehicle => {
      // Set vehicle if we received one, otherwise redirect to 404 page.
      _vehicle ? setVehicle(_vehicle) : props.history.push("/404");
    });
  }, [props.history, props.match.params]);

  function handleChange({ target }) {
    // const newVehicle = produce(vehicle, draftState => {
    //   // draftState is a copy of the vehicle that we can mutate
    //   draftState[target.name] = target.value;
    // });
    // setVehicle(newVehicle);
    setVehicle({ ...vehicle, [target.name]: target.value });
  }

  function isValid() {
    const _errors = {};
    if (!vehicle.make) _errors.make = "Make is required.";
    if (!vehicle.model) _errors.model = "Model is required.";
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!isValid()) return;
    saveVehicle(vehicle).then(savedVehicle => {
      props.history.push("/vehicles");
      toast.success("Vehicle saved.");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Manage Vehicle</h1>
      <TextInput
        label="Make"
        id="make"
        name="make"
        value={vehicle.make}
        onChange={handleChange}
        error={errors.make}
      />

      <TextInput
        label="Model"
        id="model"
        name="model"
        value={vehicle.model}
        onChange={handleChange}
        error={errors.model}
      />

      <input type="submit" value="Save Vehicle" />
    </form>
  );
}

ManageVehicle.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default ManageVehicle;
