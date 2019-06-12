import React from "react";
import Login from "./Login";
import LanguageContext from "./LanguageContext";
import { Route } from "react-router-dom";
import Home from "./Home";
import Nav from "./Nav";
import Vehicles from "./Vehicles";
import ManageVehicle from "./ManageVehicle";

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
        <label>Language:</label> {this.state.language}
        <button onClick={this.toggleLanguage}>Toggle</button>
        <Nav />
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/vehicle" component={ManageVehicle} />
        <Route path="/vehicles" component={Vehicles} />
      </LanguageContext.Provider>
    );
  }
}

export default App;
