import React, { useState, useEffect } from "react";
import Login from "./Login";
import LanguageContext from "./LanguageContext";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Nav from "./Nav";
import Vehicles from "./Vehicles";
import ManageVehicle from "./ManageVehicle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import PageNotFound from "./PageNotFound";
import { getVehicles, deleteVehicle, saveVehicle } from "./api/vehicleApi";

function App(props) {
  const [vehicles, setVehicles] = useState([]);
  const [language, setLanguage] = useState("es");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

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

  function handleSave(vehicle) {
    setIsSaving(true);
    return saveVehicle(vehicle).then(savedVehicle => {
      if (vehicle.id) {
        // Iterate over vehicles, and replace the savedVehicle in the array.
        const updatedVehicles = vehicles.map(vehicle =>
          vehicle.id === savedVehicle.id ? savedVehicle : vehicle
        );
        setVehicles(updatedVehicles);
      } else {
        setVehicles([...vehicles, savedVehicle]);
      }
      setIsSaving(false);
      toast.success("Vehicle saved.");
    });
  }

  function toggleLanguage() {
    setLanguage(language === "es" ? "en" : "es");
  }

  return (
    <LanguageContext.Provider value={language}>
      <ToastContainer autoClose={5000} />
      <label>Language:</label> {language}
      <button onClick={toggleLanguage}>Toggle</button>
      <Nav />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        {/* Note that I must explicitly pass down React Router props if I use a render prop instead of the component prop */}
        <Route
          path="/vehicle/:vehicleId?"
          render={props => (
            <ManageVehicle
              isSaving={isSaving}
              onSave={handleSave}
              vehicles={vehicles}
              history={props.history}
              match={props.match}
            />
          )}
        />
        <Route
          path="/vehicles"
          render={props => (
            <Vehicles
              vehicles={vehicles}
              isLoading={isLoading}
              onDeleteClick={handleDelete}
            />
          )}
        />
        <Route path="/404" component={PageNotFound} />
        <Route component={PageNotFound} />
      </Switch>
    </LanguageContext.Provider>
  );
}

export default App;
