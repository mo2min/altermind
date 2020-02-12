import React from "react";
import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./views/Home";

const App = () => {
  return (
    <div className="App">
      <Router>
        {/** 
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/demo" component={Demo} />
        <Footer />
        */}
        <Route path="/" exact component={Home} />
      </Router>
    </div>
  );
};

export default App;
