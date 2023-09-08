var express = require('express');
var router = express.Router();

require('../models/connection');
const Variete = require('../models/varietes');

// GET all varieties
router.get('/', (req, res) => {
  Variete.find() // This will retrieve all plants
    .then(data => res.json({ data }))
    .catch(error => res.status(500).json({ error }));
});

// GET varieties by 'famille'
router.get('/:famille', (req, res) => {
  const famille = req.params.famille;

  if (famille === 'All') {
    // If famille is "All," return all varieties
    Variete.find()
      .then(data => res.json({ data }))
      .catch(error => res.status(500).json({ error }));
  } else if (famille === 'Nouveautés') {
    // If famille is "Nouveauté," filter the variété field to include "Nouv"
    Variete.find({ variete: new RegExp("Nouv", "i") }) // Filter variété field to include "Nouv" (case-insensitive)
    .then(data => {
      // Process variété field to remove specified words and double spaces
      const processedData = data.map(plant => ({
        ...plant._doc,
        variete: plant.variete
          .replace(/Nouveauté/gi, '') // Remove "Nouveauté" (case-insensitive)
          .replace(/Nouv(\.| )?/gi, '') // Remove "Nouv" or "Nouv." or "Nouv " (case-insensitive)
          .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
          .trim() // Trim leading and trailing spaces
      }));
      res.json({ data: processedData });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing the data.' });
    });
  } else {
    // For other familles, filter by the specified famille
    Variete.find({ famille })
      .then(data => res.json({ data }))
      .catch(error => res.status(500).json({ error }));
  }
});


module.exports = router;
