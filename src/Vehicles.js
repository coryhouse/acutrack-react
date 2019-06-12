import React, { useEffect, useState } from "react";
import { getVehicles, deleteVehicle } from "./api/vehicleApi";
import { Link } from "react-router-dom";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  // This is equivalent to componentDidMount
  useEffect(() => {
    getVehicles().then(_vehicles => {
      setVehicles(_vehicles);
    });
  }, []);

  function handleDelete(vehicleId) {
    // Call api to delete
    deleteVehicle(vehicleId).then(() => {
      // the call to delete has been completed.
      // Remove the vehicle from our local state
      const newVehicles = vehicles.filter(vehicle => vehicle.id !== vehicleId);
      setVehicles(newVehicles);
    });
  }

  function renderHeader() {
    const noVehiclesMessage =
      vehicles.length === 0 ? <p>No vehicles found.</p> : null;

    return (
      <>
        <h1>Vehicles</h1> <Link to="/vehicle">Add Vehicle</Link>
        {noVehiclesMessage}
      </>
    );
  }

  return (
    <>
      {renderHeader()}
      {vehicles.length > 0 && (
        <table>
          <thead>
            <tr>
              <th />
              <th>Make</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr>
                <td>
                  <button onClick={() => handleDelete(vehicle.id)}>
                    Delete
                  </button>
                </td>
                <td>{vehicle.make}</td>
                <td>{vehicle.model}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Vehicles;
