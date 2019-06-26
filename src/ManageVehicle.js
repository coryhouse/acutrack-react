import React, { useState, useEffect } from "react";
import TextInput from "./TextInput";
// import produce from "immer";
import PropTypes from "prop-types";
import Loading from "./Loading";

function ManageVehicle(props) {
  const [vehicle, setVehicle] = useState({
    make: "",
    model: ""
  });

  const [errors, setErrors] = useState({});

  const { vehicleId } = props.match.params;

  useEffect(() => {
    if (vehicleId) {
      // Set vehicle if we received one, otherwise redirect to 404 page.
      const _vehicle = props.vehicles.find(
        vehicle => vehicle.id === parseInt(vehicleId)
      );
      _vehicle ? setVehicle(_vehicle) : props.history.push("/404");
    }
  }, [props.history, props.vehicles, vehicleId]);

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

  function handleSave(event) {
    event.preventDefault();
    if (isValid()) {
      props.onSave(vehicle).then(() => {
        props.history.push("/vehicles");
      });
    }
  }

  return (
    <form onSubmit={handleSave}>
      <h1>Manage Vehicle</h1>
      {props.isLoading ? (
        <Loading />
      ) : (
        <>
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

          <input
            type="submit"
            disabled={props.isSaving}
            value={props.isSaving ? "Saving..." : "Save Vehicle"}
          />
        </>
      )}
    </form>
  );
}

ManageVehicle.propTypes = {
  isSaving: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  vehicles: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default ManageVehicle;
