import React from "react";
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MealsList from "./components/MealsList/MealsList";
import MealDetails from "./components/MealsList/Meal/MealDetails/MealDetails";
import AllMeals from "./components/MealsList/AllMeals/AllMeals";
import About from "./components/About/About";
import Reviews from "./components/Reviews/Reviews";
import UseFetchData from "./components/UseFetchData/UseFetchData";

const imageArray = [
    {
        mealId: 1,
        mealUrl: "https://www.opskrifter.dk/images/recipes/0XkmqwPM6gBf0zKw0vgSGyhSKgky2DQSiSmvwyxN.jpeg"
    },
    {
        mealId: 2,
        mealUrl: "https://www.iheartnaptime.net/wp-content/uploads/2021/09/I-Heart-Naptime-chicken-pad-thai-7.jpg"
    },
    {
        mealId: 3,
        mealUrl: "https://healthyfitnessmeals.com/wp-content/uploads/2022/08/Vegetarian-burrito-bowl-5.jpg"
    },
    {
        mealId: 4,
        mealUrl: "https://www.chelseasmessyapron.com/wp-content/uploads/2018/01/Quinoa-Recipes-1.jpeg"
    },
    {
        mealId: 5,
        mealUrl: "https://www.fifteenspatulas.com/wp-content/uploads/2016/06/Homemade-Sushi-5.jpg"
    },
    {
        mealId: 6,
        mealUrl: "https://www.cookingclassy.com/wp-content/uploads/2018/01/roasted-chicken-veggies-garlic-herb-vinaigrette-20.jpg"
    },
    {
        mealId: 7,
        mealUrl: "https://www.spoonforkbacon.com/wp-content/uploads/2021/03/shrimp_scampi_recipe_card.jpg"
    },
    {
        mealId: 8,
        mealUrl: "https://www.primalpalate.com/wp-content/uploads/2011/12/111_1-1080x720.jpg"
    },
    {
        mealId: 9,
        mealUrl: "https://static9.depositphotos.com/1588534/1095/i/600/depositphotos_10957284-stock-photo-cheeseburger-and-french-fries.jpg"
    },
    {
        mealId: 10,
        mealUrl: "https://playswellwithbutter.com/wp-content/uploads/2022/02/Beef-and-Vegetable-Stir-Fry-16.jpg"
    }
];

function App() {
    const { data: meals } = UseFetchData('http://localhost:3005/all-meals');

    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/">
                    <h1>Our Menu</h1>
                    <MealsList meals={meals} />
                </Route>
                <Route exact path="/meals">
                    <AllMeals
                        meals={meals}
                    />
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
export {imageArray};
