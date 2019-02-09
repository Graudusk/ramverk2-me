const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/

router.post("/", (req, res) => {
    const body = req.body;
        // spara lösenord i databasen.
    db.get("SELECT * FROM users WHERE email = ?",
        body.email,
        (err, row) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/register",
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            bcrypt.compare(body.password, row.password, function(e, result) {

                if (result) {
                    const payload = { email: row.email };
                    const secret = process.env.JWT_SECRET;
                    console.log(secret);
                    const jwtToken = jwt.sign(payload, secret, { expiresIn: '24h' });
                    // const token = jwt.sign(payload, secret, { expiresIn: '1h'});

                    return res.json({
                        data: {
                            type: "success",
                            message: "User logged in",
                            user: payload,
                            token: jwtToken
                        }
                    });
                } else {
                    return res.status(401).json({
                        errors: {
                            status: 401,
                            source: "/login",
                            title: "Wrong password",
                            detail: "Password is incorrect."
                        }
                    });
                }
            });
        }
    );
    // res.status(500).json({ data: "No user with those credentials exist." });
});

module.exports = router;
