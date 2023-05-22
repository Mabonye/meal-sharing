import React from "react";
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MealsList from "./components/MealsList/MealsList";
import MealDetails from "./components/MealsList/Meal/MealDetails/MealDetails";
import AllMeals from "./components/MealsList/AllMeals/AllMeals";
import About from "./components/About/About";
import Reviews from "./components/Reviews/Reviews";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/">
                    <h1>Our Menu</h1>
                    <MealsList />
                </Route>
                <Route exact path="/meals">
                    <AllMeals />
                </Route>
                <Route exact path="/meals/:id">
                    <MealDetails />
                </Route>
                <Route exact path="/about">
                    <About />
                </Route>
                <Route exact path="/reviews">
                    <Reviews />
                </Route>
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
