const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

module.exports = (function () {
    function getReport(res, reportTitle) {
        db.get("SELECT * FROM reports WHERE title = ?",
            reportTitle,
            (err, row) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: "/" + reportTitle,
                            title: "Database error",
                            detail: err.message
                        }
                    });
                } else {
                    // console.log(row.data);
                    // console.log(JSON.parse(row.data));
                    // res.json( { data: row } );
                    res.json( JSON.parse(row.data) );
                }
            });
    }

    function addReport(res, body) {
        db.run("INSERT INTO reports (title, data)" +
            " VALUES (?, ?)",
        body.title,
        body.data,
        (err) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/report",
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            res.status(201).json({ data: body });
        });
    }

    return {
        addReport: addReport,
        getReport: getReport
    };
}());
