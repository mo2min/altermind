import React from "react";
import "./App.css";
import { HashRouter as Router } from "react-router-dom";

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
      </Router>
    </div>
  );
};

export default App;
