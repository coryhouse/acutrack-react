export function getVehicles() {
  return fetch("http://localhost:3001/vehicles").then(response => {
    if (!response.ok) throw new Error("Network response was not okay.");
    return response.json().catch(error => {
      console.error(error);
      throw error;
    });
  });
}

export function getVehicle(vehicleId) {
  return fetch("http://localhost:3001/vehicles/" + vehicleId).then(response => {
    if (response.ok)
      return response.json().catch(error => {
        console.error(error);
        throw error;
      });
  });
}

export function deleteVehicle(vehicleId) {
  return fetch("http://localhost:3001/vehicles/" + vehicleId, {
    method: "DELETE"
  }).then(response => {
    if (!response.ok) throw new Error("Network response was not okay.");
    return response.json().catch(error => {
      console.error(error);
      throw error;
    });
  });
}

export function saveVehicle(vehicle) {
  return fetch("http://localhost:3001/vehicles/" + vehicle.id || "", {
    body: JSON.stringify(vehicle),
    headers: { "content-type": "application/json" },
    method: vehicle.id ? "PUT" : "POST"
  }).then(response => {
    if (!response.ok) throw new Error("Network response was not okay.");
    return response.json().catch(error => {
      console.error(error);
      throw error;
    });
  });
}
