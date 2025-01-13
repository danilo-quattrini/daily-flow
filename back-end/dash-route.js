const express = require('express');
const router_dash = express.Router();
const dashController = require('./dash-controller');

// Route to handle the add habit (POST request)
router_dash.post('/add-habit', dashController.addHabit);

// Route to handle the delete habit (POST request)
router_dash.delete('/delete-habit/:id', dashController.deleteHabit);

// Route to handle the update habit (POST request)
router_dash.put('/update-habit/:id', dashController.updateHabit);

// Route to handle the get habit (GET request)
router_dash.get('/get-habit', dashController.getHabit);

// Export the router
module.exports = router_dash;