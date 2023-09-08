var express = require('express');
var router = express.Router();

require('../models/connection');
const Variete = require('../models/varietes');

// GET all varieties
router.get('/', (req, res) => {
  Variete.find() // Ceci récupérera toutes les plantes
    .then(data => res.json({ data }))
    .catch(error => res.status(500).json({ error }));
});

// GET varieties by 'famille'
router.get('/:famille', (req, res) => {
  const famille = req.params.famille;

  if (famille === 'All' || famille === 'Nouveautés') {
    // Si la famille est "All" ou "Nouveautés", renvoie toutes les variétés
    Variete.find()
      .then(data => res.json({ data }))
      .catch(error => res.status(500).json({ error }));
  } else {
    // Sinon, filtre par la famille spécifiée
    Variete.find({ famille })
      .then(data => res.json({ data }))
      .catch(error => res.status(500).json({ error }));
  }
});

module.exports = router;
