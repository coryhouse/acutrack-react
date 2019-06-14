import React from "react";
import Login from "./Login";
import LanguageContext from "./LanguageContext";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Nav from "./Nav";
import Vehicles from "./Vehicles";
import ManageVehicle from "./ManageVehicle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import PageNotFound from "./PageNotFound";

class App extends React.Component {
  state = {
    language: "es"
  };

  toggleLanguage = () => {
    const newLang = this.state.language === "es" ? "en" : "es";
    this.setState({ language: newLang });
  };

  render() {
    return (
      <LanguageContext.Provider value={this.state.language}>
        <ToastContainer autoClose={5000} />
        <label>Language:</label> {this.state.language}
        <button onClick={this.toggleLanguage}>Toggle</button>
        <Nav />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/vehicle/:vehicleId?" component={ManageVehicle} />
          <Route path="/vehicles" component={Vehicles} />
          <Route path="/404" component={PageNotFound} />
          <Route component={PageNotFound} />
        </Switch>
      </LanguageContext.Provider>
    );
  }
}

export default App;
