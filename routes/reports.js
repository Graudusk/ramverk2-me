const express = require('express');
const reports = require('../models/reports');
const router = express.Router();
const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function(err/*, decoded*/) {
        if (err) {
            return reports.returnError(res, err, "/reports", "Database error");
        }

        next();
    });
}

router.post("/",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => reports.addReport(res, req.body));



router.get('/:report', (req, res) => reports.getReport(res, req.params.report));


module.exports = router;
