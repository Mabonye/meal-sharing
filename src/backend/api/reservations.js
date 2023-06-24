const express = require("express");
const reservationsRouter = express.Router();
const knex = require("../database");


// GET "/"
reservationsRouter.get("/", async (req, res) => {
  try {
    const reservations = await (knex.select('*').from('reservation'));
    res.json(reservations);
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while reading reservations'
    });
  }
});


// POST "/"
reservationsRouter.post("/", async (req, res) => {
  const newReservation = req.body;
  console.log(newReservation);
  try {
    const reservation = await knex('reservation')
      .insert(newReservation)

    res.status(201).send(newReservation);

  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while creating a reservation'
    });
  }

});


// GET "/:id"
reservationsRouter.get("/:id", async (req, res) => {
  const reservationId = Number(req.params.id);
  try {
    const reservation = await (
      knex.select('*')
        .from('reservation')
        .where('id', '=', reservationId))
        .first();

    if (!reservation) {
      return res.status(404).send(`Reservation with Id ${reservationId} not found`);
    }
    res.json(reservation);

  } catch (err) {
    res.status(500).json({
      error: 'An error occurred while reading a reservation'
    });
  }

});


// UPDATE "/:id"
reservationsRouter.put('/:id', async (req, res) => {
  const reservationId = Number(req.params.id);
  const updatedReservation = req.body;
  try {
    const reservation = await knex('reservation')
      .where("id", reservationId)
      .update(updatedReservation)

    if (!reservation) {
      return res.status(404).send(`Reservation with Id ${reservationId} not found`);
    }
    res.status(200).json({
      message: `Reservation with ID ${reservationId} updated successfully`
    });

  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while updating the reservation'
    });
  }
});


// DELETE "/:id"
reservationsRouter.delete("/:id", async (req, res) => {
  const reservationId = Number(req.params.id);

  try {
    const deletedReservation = await knex('reservation')
      .where('id', reservationId)
      .del();

    if (deletedReservation === 0) {
      return res.status(404).json({
        error: `Reservation with ID ${reservationId} does not exist`
      });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while deleting a reservation'
    });
  }
});


module.exports = reservationsRouter;