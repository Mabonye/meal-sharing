const express = require("express");
const mealsRouter = express.Router();
const knex = require("../database");


// GET 
mealsRouter.get("/", async (req, res) => {

    const {
        maxPrice,
        availableReservations,
        title,
        dateAfter,
        dateBefore,
        limit,
        sortKey,
        sortDir
    } = req.query;

    let meals;

    try {
        if (maxPrice) {
            /* 
                Returns all meals that are cheaper than maxPrice
            */
            if (isNaN(maxPrice)) {
                res.send({ message: 'maxPrice must be a number' })
            } else {
                meals = await knex
                    .select('*').from('meal')
                    .where("price", "<=", maxPrice);
            }
            
            /* 
                Returns all meals that still have available spots 
                left, if true. If false, return meals that have 
                no available spots left
            */
        } else if (availableReservations === 'true' || availableReservations === 'false') {
            const available = availableReservations === 'true';
            meals = await knex.select('meal.*').from('meal')
                .sum('reservation.number_of_guests as total_reservation')
                .leftJoin('reservation', 'meal.id', 'reservation.meal_id')
                .groupBy('meal.id')
                .havingRaw(`COALESCE(SUM(reservation.number_of_guests), 0) ${available ? '<' : '>='} meal.max_reservations`);
            
            /*
                Returns all meals that partially match the given title 
            */    
        } else if (title) {
            meals = await knex
                .select('*').from('meal')
                .where('title', 'LIKE', `%${title}%`);
            
            /* 
                Returns all meals where the date for when is after the given date
            */
        } else if (dateAfter) {
            meals = await knex
                .select('*').from('meal')
                .where('when', '>', new Date(dateAfter));
            
            /* 
                Returns all meals where the date for when is before the given date
            */
        } else if (dateBefore) {
            meals = await knex
                .select('*').from('meal')
                .where('when', '<', new Date(dateBefore));
            
            /* 
                Returns the given number of meals
            */
        } else if (limit) {
            meals = await knex
                .select('*').from('meal')
                .limit(limit);
            
            /* 
                Returns all meals sorted by the given key. Allows when, 
                max_reservations and price as keys. Also, returns all 
                meals sorted in the given direction (combined with the 
                sortKey and allows asc or desc)
            */
        } else if (sortKey) {
            switch (sortKey) {
                case 'when':
                    meals = await knex.select('*').from('meal').orderBy('when', sortDir || 'asc');
                    break;
                case 'max_reservations':
                    meals = await knex.select('*').from('meal').orderBy('max_reservations', sortDir || 'asc');
                    break;
                case 'price':
                    meals = await knex.select('*').from('meal').orderBy('price', sortDir || 'asc');
                    break;
                default:
                    res.send({ message: 'Invalid sortKey value' });
                    return;
            }

        } else {
            res.status(400).send({ message: 'Bad request' })
        }

        const mealList = await meals;
        res.json(mealList);
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


// Returns all reviews for a specific meal
mealsRouter.get("/:meal_id/reviews", async (request, response) => {
    const mealId = Number(request.params.meal_id);

    try {
        const reviews = await (knex.select('*')
            .from('review')
            .where('meal_id', mealId));

        if (reviews.length === 0) {
            response.status(404).send(`Meal with Id ${mealId} does not have review`);
        } else {
            response.json(reviews);
        }

    } catch (err) {
        response.status(500).json({ 
            message: "Internal Server Error" 
        });
    }
});



module.exports = mealsRouter;


