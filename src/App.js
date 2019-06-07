import React from "react";
import Login from "./Login";
import LanguageContext from "./LanguageContext";

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
        <label>Language:</label> {this.state.language}{" "}
        <button onClick={this.toggleLanguage}>Toggle</button>
        <Login />
      </LanguageContext.Provider>
    );
  }
}

export default App;
