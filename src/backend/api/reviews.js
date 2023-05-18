const express = require("express");
const reviewsRouter = express.Router();
const knex = require("../database");

// Returns all reviews
reviewsRouter.get("/", async (req, res) => {
    try {
        const reviews = await (knex.select('*').from('review'));
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ 
            message: "Internal Server Error" 
        });
    }
});


// Adds a new review to the database
reviewsRouter.post("/", async (request, response) => {
    const newReview = request.body;
    try {
        await knex('review')
            .insert(newReview)

        response.status(201).send(newReview);
    } catch (err) {
        response.status(500).json({
            err: 'An error occurred while creating a review'
        });
    }
});


//Returns a review by id
reviewsRouter.get("/:id", async (request, response) => {
    const reviewId = Number(request.params.id);

    try {
        const review = await (knex.select('*')
            .from('review')
            .where('id', reviewId))
            .first();

        if (!review) {
            response.status(404).send(`Review with Id ${reviewId} is not found`);
        }
        response.json(review);
    } catch (err) {
        response.status(500).send(err);
    }
});


// Updates the review by id
reviewsRouter.put("/:id", async (request, response) => {
    const reviewId = Number(request.params.id);
    const updatedReview = request.body;
    try {
        const review = await knex('review')
            .where("id", reviewId)
            .update(updatedReview)

        if (!review) {
            response.status(404).send(`Review with Id ${reviewId} not found`);
        } else {
            response.status(200).json({
                message: `Review with ID ${reviewId} updated successfully`
            });
        }

    } catch (error) {
        response.status(500).json({
            error: 'An error occurred while updating a review'
        });
    }
});


// Deletes the review by id
reviewsRouter.delete("/:id", async(request, response) => {
    const reviewId = Number(request.params.id);

   try {
      const deletedReview = await knex('review')
         .where('id', reviewId)
         .del();

      if (deletedReview === 0) {
         return response.status(404).json({
            error: `Review with ID ${reviewId} does not exist`
         });
      }

      response.status(204).end();
   } catch (error) {
      response.status(500).json({
         error: 'An error occurred while deleting a review'
      });
   }
})

module.exports = reviewsRouter;