const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

function returnError(res, err, source, title, status = 500) {
    return res.status(status).json({
        errors: {
            status: status,
            source: source,
            title: title,
            detail: err.message
        }
    });
}

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
                // let textData = row.data.replace(/\\n/g, "</br>");/*replace("\\n", "")*/

                // console.log(textData);
                return res.json(JSON.parse(row.data));
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

module.exports = {
    returnError: returnError,
    addReport: addReport,
    getReport: getReport
};
