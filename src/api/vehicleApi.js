export function getVehicles() {
  return fetch("http://localhost:3001/vehicles").then(response => {
    if (!response.ok) throw new Error("Network response was not okay.");
    return response.json().catch(error => {
      console.error(error);
      throw error;
    });
  });
}
