import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MealsList from "./components/MealsList/MealsList";

function App() {
    return (
        <Router>
            <Route exact path="/">
                <MealsList />
            </Route>
        </Router>   
    );
}

export default App;