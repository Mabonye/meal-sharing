const express = require("express");
const mealsRouter = express.Router();
const knex = require("../database");


// GET meals using maxPrice
mealsRouter.get("/", async (req, res) => {
    const meals = knex.select('*').from('meal');
    const {
        maxPrice,
        title,
        dateAfter,
        dateBefore } = req.query;
    /*
    availableReservations,
    title,
    dateAfter,
    dateBefore,
    limit,
    sortKey,
    sortDir */

    if (maxPrice) {
        meals.where("price", "<=", maxPrice);
    } else if (title) {
        meals.where('title', 'LIKE', `%${title}%`);
    } else if (dateAfter) {
        meals.where('when_date', '>', new Date(dateAfter));
    } else if (dateBefore) {
        meals.where('when_date', '<', new Date(dateBefore));
    }

    try {
        const result = await meals;
        res.json(result);
    } catch (error) {
        throw error;
    }
});


// POST /
mealsRouter.post("/", async (req, res) => {
    const newMeal = req.body;
    try {
        await knex('meal')
            .insert(newMeal)

        res.status(201).send(newMeal);
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'An error occurred while creating the meal'
        });
    }

});


// GET meal by Id
mealsRouter.get("/:id", async (req, res) => {
    const mealId = Number(req.params.id);
    try {
        const meal = await (
            knex.select('*')
                .from('meal')
                .where('id', '=', mealId))
            .first();

        if (!meal) {
            res.status(404).send(`Meal with Id ${mealId} not found`);
        } else {
            res.json(meal);
        }

    } catch (err) {
        res.status(500).send(err);
    }

});


// UPDATE a meal
mealsRouter.put('/:id', async (req, res) => {
    const mealId = Number(req.params.id);
    const updatedMeal = req.body;
    try {
        const meal = await knex('meal')
            .where("id", mealId)
            .update(updatedMeal)

        if (!meal) {
            res.status(404).send(`Meal with Id ${mealId} not found`);
        } else {
            res.status(200).json({
                message: `Meal with ID ${mealId} updated successfully`
            });
        }

    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while updating the meal'
        });
    }
});


// DELETE 
mealsRouter.delete("/:id", async (req, res) => {
    const mealId = Number(req.params.id);

    try {
        const deletedMeal = await knex('meal')
            .where('id', mealId)
            .del();

        if (deletedMeal === 0) {
            return res.status(404).json({
                error: `Meal with ID ${mealId} does not exist`
            });
        }

        res.status(204).end();
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while deleting the meal'
        });
    }
});

module.exports = mealsRouter;



/*else if (availableReservations) {
        meals.leftJoin('reservation', 'meal.id', '=', 'reservation.meal_id')
            .groupBy('meal.id')
            .having(knex.raw('SUM(reservation.number_of_guests) < meal.max_reservations'));
    } */
