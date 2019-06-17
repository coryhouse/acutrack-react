import React, { useEffect, useState } from "react";
import { getVehicles, deleteVehicle } from "./api/vehicleApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "./Loading";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // This is equivalent to componentDidMount
  useEffect(() => {
    getVehicles().then(_vehicles => {
      setVehicles(_vehicles);
      setIsLoading(false);
    });
  }, []);

  function handleDelete(vehicleId) {
    // Optimistic delete. Assuming the delete will succeed.
    const vehiclesCopy = [...vehicles];
    const newVehicles = vehicles.filter(vehicle => vehicle.id !== vehicleId);
    // This is an async call. React sets state in an async manner. Set state sometime in the near future.
    setVehicles(newVehicles);
    toast.info("Vehicle delete in progress...");
    deleteVehicle(vehicleId)
      .then(() => {
        toast.success("Vehicle deleted");
      })
      .catch(error => {
        setVehicles([...vehiclesCopy]);
        toast.error("Oops. Delete failed. Error:" + error.message);
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

  if (isLoading) return <Loading />;

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
              <tr key={vehicle.id}>
                <td>
                  <button onClick={() => handleDelete(vehicle.id)}>
                    Delete
                  </button>
                </td>
                <td>
                  <Link to={`/vehicle/${vehicle.id}`}>{vehicle.make}</Link>
                </td>
                <td>
                  <Link to={`vehicle/${vehicle.id}`}>{vehicle.model}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Vehicles;
