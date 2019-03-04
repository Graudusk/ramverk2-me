/**
 * Connect to the database and search using a criteria.
 */
"use strict";

// MongoDB
const mongo = require("mongodb").MongoClient;
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/chat";
// const dsn =  process.env.DBWEBB_DSN || "mongodb://graudusk.me:27017/chat";

// Express server
// const port = process.env.DBWEBB_PORT || 1337;
const express = require("express");
const router = express.Router();


// Return a JSON object with list of all documents within the collection.
router.get("/", async (request, response) => {
    try {
        let res = await findInCollection(dsn, "chat", {}, {}, 0);

        console.log(res);
        response.json(res);
    } catch (err) {
        console.log(err);
        response.json(err);
    }
});

// Return a JSON object with list of all documents within the collection.
router.post("/", async (request, response) => {
    try {
        let res = await insertIntoCollection(dsn, "chat", request.body);

        console.log(res);
        response.json(res);
    } catch (err) {
        console.log(err);
        response.json(err);
    }
});



// Startup server and liten on port
// router.listen(port, () => {
//     console.log(`Server is listening on ${port}`);
//     console.log(`DSN is: ${dsn}`);
// });



/**
 * Find documents in an collection by matching search criteria.
 *
 * @async
 *
 * @param {string} dsn        DSN to connect to database.
 * @param {string} colName    Name of collection.
 * @param {object} criteria   Search criteria.
 * @param {object} projection What to project in results.
 * @param {number} limit      Limit the number of documents to retrieve.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<array>} The resultset as an array.
 */
async function findInCollection(dsn, colName, criteria, projection, limit) {
    const client  = await mongo.connect(dsn, { useNewUrlParser: true });
    const db = await client.db();
    const col = await db.collection(colName);
    const res = await col.find(criteria, projection).limit(limit).toArray();

    await client.close();

    return res;
}


async function insertIntoCollection(dsn, colName, data) {
    console.log(data);
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);

    // await col.deleteMany();
    const res = await col.insertMany(data);

    await client.close();

    return res;
}

module.exports = router;
