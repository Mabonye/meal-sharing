const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const knex = require("./database.js");


const mealsRouter = require("./api/meals");

//week2
const reservationsRouter = require("./api/reservations");

//week3
const reviewsRouter = require("./api/reviews");

const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3005;
const cors = require("cors");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);


//week2
router.use("/reservations", reservationsRouter);

//week3
router.use("/reviews", reviewsRouter);

app.use(router);


app.get("/:type", async (req, res) => {
    const { type } = req.params;
    const now = new Date();

    let query;

    // Routes and their responses
    switch (type) {
        case "future-meals":
            query = knex.select('*').from('meal').where('when_date', '>', now);
            break;
        case "past-meals":
            query = knex.select('*').from('meal').where('when_date', '<', now);
            break;
        case "all-meals":
            query = knex.select('*').from('meal').orderBy('id');
            break;
        case "first-meal":
            query = knex.select('*').from('meal').where("id", 1).first();
            break;
        case "last-meal":
            query = knex.select('*').from('meal').orderBy("id", 'desc').first();
            break;
        default:
            return res.status(400).send("Invalid type parameter");
    }

    try {
        const result = await query;
        if (result.length === 0 && (type === "first-meal" || type === "last-meal")) {
            return res.status(404).send("There are no meals");
        }
        res.json(result);

    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});


if (process.env.API_PATH) {
    app.use(process.env.API_PATH, router);
} else {
    throw "API_PATH is not set. Remember to set it in your .env file"
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
    res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;

