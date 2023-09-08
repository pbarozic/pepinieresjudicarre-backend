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

  Variete.find({ famille }) // This will filter by the 'famille' field
    .then(data => res.json({ data }))
    .catch(error => res.status(500).json({ error }));
});

module.exports = router;