import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";

function App() {
  return (
    <div className="app">
      <Router>
        <>
          <Header />
          <Switch>
            <Route exact path="/"></Route>
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
