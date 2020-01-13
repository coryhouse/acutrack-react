import React, { useState, useEffect, useReducer, Suspense } from "react";
import { vehicleReducer } from "./vehicleReducer";
import Login from "./Login";
import LanguageContext from "./LanguageContext";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Nav from "./Nav";
import ManageVehicle from "./ManageVehicle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import PageNotFound from "./PageNotFound";
import { getVehicles, deleteVehicle, saveVehicle } from "./api/vehicleApi";
import Loading from "./Loading";

// Lazy load the vehicle component. Place the component in a separate bundle
const Vehicles = React.lazy(() => import("./Vehicles"));

function App(props) {
  const [vehicles, dispatch] = useReducer(vehicleReducer, []);
  const [language, setLanguage] = useState("es");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // This is equivalent to componentDidMount
  useEffect(() => {
    getVehicles().then(_vehicles => {
      dispatch({ type: "load", vehicles: _vehicles });
      setIsLoading(false);
    });
  }, []);

  async function handleDelete(vehicleId) {
    // Optimistic delete. Assuming the delete will succeed.
    const vehiclesCopy = [...vehicles];
    // This is an async call. React sets state in an async manner. Set state sometime in the near future.
    dispatch({ type: "delete", vehicleId: vehicleId });
    toast.info("Vehicle delete in progress...");
    try {
      await deleteVehicle(vehicleId);
      toast.success("Vehicle deleted");
    } catch (error) {
      dispatch({ type: "load", vehicles: [...vehiclesCopy] });
      toast.error("Oops. Delete failed. Error:" + error.message);
    }
  }

  function handleSave(vehicle) {
    setIsSaving(true);
    return saveVehicle(vehicle).then(savedVehicle => {
      dispatch({ type: vehicle.id ? "edit" : "add", vehicle: savedVehicle });
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
              {...props}
            />
          )}
        />
        <Suspense fallback={<Loading />}>
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
        </Suspense>
        <Route path="/404" component={PageNotFound} />
        <Route component={PageNotFound} />
      </Switch>
    </LanguageContext.Provider>
  );
}

export default App;
