export async function getVehicles() {
  // This next line makes an async call, so pause here until the call is complete. Store the result in response.
  try {
    const response = await fetch("http://localhost:3001/vehicles");
    if (!response.ok) throw new Error("Network response was not okay.");
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
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

export async function deleteVehicle(vehicleId) {
  try {
    const response = await fetch(
      "http://localhost:3001/vehicles/" + vehicleId,
      {
        method: "DELETE"
      }
    );
    if (!response.ok) throw new Error("Network response was not okay.");
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function saveVehicle(vehicle) {
  const url = vehicle.id
    ? "http://localhost:3001/vehicles/" + vehicle.id
    : "http://localhost:3001/vehicles/";
  return fetch(url, {
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
