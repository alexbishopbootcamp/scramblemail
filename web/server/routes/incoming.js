const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: 'OK' });
  console.log("POST");
});

router.get('/', (req, res) => {
  res.status(200).json({ message: 'OK' });
  console.log("GET");
});

module.exports = router;