var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/kmom01', function(req, res, next) {
    const questions = [
        {
            question: "Berätta utförligt om din syn på nodejs backend ramverk och berätta vilket ramverk du valde och varför.",
            answer: "Jag valde expressjs som backend ramverk, då jag har stor tidigare erfarenhet med det ramverket och att det är det mest använda nodejs ramverket."
        },
        {
            question: "Berätta om din katalogstruktur och hur du organiserade din kod, hur tänkte du?",
            answer: "Jag skapade en katalog med routes, som liknar det som kommer från scaffoldingen med express. Varje route fil exporterar en router."
        },
        {
            question: "Använde du någon form av scaffolding som ditt valda ramverk erbjuder?",
            answer: ""
        },
        {
            question: "Vad är din TIL för detta kmom?",
            answer: ""
        },
    ];

    res.json({ data: questions });
});

module.exports = router;
