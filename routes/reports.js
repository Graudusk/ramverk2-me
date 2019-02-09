const express = require('express');
const reports = require('../models/reports');
const router = express.Router();
const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function(err/*, decoded*/) {
        if (err) {
            return reports.returnError(res, err, "/reports", "Database error");
            
            // return res.status(500).json({
            //     errors: {
            //         status: 500,
            //         source: "/reports",
            //         title: "Database error",
            //         detail: err.message
            //     }
            // });
        }

        // Valid token send on the request
        next();
    });
}

router.post("/",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => reports.addReport(res, req.body));



router.get('/:report', (req, res) => reports.getReport(res, req.params.report));


module.exports = router;
