import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function Vehicles(props) {
  function renderHeader() {
    const noVehiclesMessage =
      props.vehicles.length === 0 ? <p>No vehicles found.</p> : null;

    return (
      <>
        <h1>Vehicles</h1> <Link to="/vehicle">Add Vehicle</Link>
        {noVehiclesMessage}
      </>
    );
  }

  if (props.isLoading) return <Loading />;

  return (
    <>
      {renderHeader()}
      {props.vehicles.length > 0 && (
        <table>
          <thead>
            <tr>
              <th />
              <th>Make</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            {props.vehicles.map(vehicle => (
              <tr key={vehicle.id}>
                <td>
                  <button onClick={() => props.onDeleteClick(vehicle.id)}>
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

Vehicles.propTypes = {
  loading: PropTypes.bool.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  vehicles: PropTypes.array.isRequired
};

export default Vehicles;
