const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const index = require('./routes/index');
const reports = require('./routes/reports');
const register = require('./routes/register');
const login = require('./routes/login');
const chat = require('./routes/chat');
const port = 1337;
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/chat";
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

app.use('/', index);
app.use('/reports', reports);
app.use('/register', register);
app.use('/login', login);
app.use('/chat', chat);

// app.post("/register", (req, res) => {
//     const body = req.body;
//     db.run("INSERT INTO users (email, password) VALUES (?, ?)",
//         body.email,
//         body.password, (err) => {
//         if (err) {
//             // returnera error
//         }

//         // returnera korrekt svar
//     });
// });
app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

// Start up server
// const server = app.listen(port, () => console.log(`Me API listening on port ${port}!`));
const server = app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
    console.log(`DSN is: ${dsn}`);
});

// const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = server;
