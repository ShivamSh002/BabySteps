const { getAllDocotrs, getAllSlot } = require('../Middlewares/Doctor.middleware');

const Router = require('express').Router();

Router.get('/', getAllDocotrs );
Router.get('/:id/slot', getAllSlot);


module.exports = Router;