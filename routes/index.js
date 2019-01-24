var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    const data = {
        name: "Eric Johansson",
        city: "Enköping",
        description: "Hej! Jag heter Eric Johansson och studerar på Blekinge tekniska Högskola. Mina hobbies är att spela gitarr, göra spel, resa, laga mat och reparera kod.",
    };

    res.json(data);
});

module.exports = router;
