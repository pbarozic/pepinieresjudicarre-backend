var express = require("express");
var router = express.Router();

require("../models/connection");
const Variete = require("../models/varietes");

// GET all varieties
router.get("/", (req, res) => {
  Variete.find() // This will retrieve all plants
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
});

router.get("/:famille", async (req, res) => {
  const famille = req.params.famille;
  try {
    if (famille === "All") {
      const data = await Variete.find();
      res.json({ data });
    } else if (famille === "Nouveautés") {
      const data = await Variete.find({ variete: new RegExp("Nouv", "i") });
      const processedData = data.map((plant) => ({
        ...plant._doc,
        variete: plant.variete
          .replace(/Nouveauté/gi, "")
          .replace(/Nouv(\.| )?/gi, "")
          .replace(/\s+/g, " ")
          .trim(),
      }));
      res.json({ data: processedData });
    } else {
      const data = await Variete.find({ famille });
      res.json({ data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing the data." });
  }
});

module.exports = router;
