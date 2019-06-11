import React, { useEffect, useState } from "react";
import { getVehicles } from "./api/vehicleApi";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  // This is equivalent to componentDidMount
  useEffect(() => {
    getVehicles().then(_vehicles => {
      setVehicles(_vehicles);
    });
  }, []);

  return (
    <>
      <h1>Vehicles</h1>
      <table>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => (
            <tr>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Vehicles;
