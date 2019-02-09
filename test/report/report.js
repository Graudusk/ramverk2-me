/**
 * Test for class Card.
 */
"use strict";

/* global describe it */

var assert = require("assert");
const report = require("../../models/reports");

describe("Dummy test", function() {
    it("dummy", function() {
        assert(true, true);
    });
});

// describe("Get different reports", function() {
//     describe("Get report 1", function() {
//         it("should be card ♣A", function() {
//             // let card = new Card();
//             let res = report.getReport();

//             assert.equal(res, "♣A");
//         });

//         it("should have rank 14", function() {
//             let card = new Card();
//             let res = card.getRank(0);

//             assert.equal(res, 14);
//         });
//     });

//     describe("Get card with value 1", function() {
//         it("should be card ♣2", function() {
//             let card = new Card();
//             let res = card.getCard(1);

//             assert.equal(res, "♣2");
//         });

//         it("should have rank 2", function() {
//             let card = new Card();
//             let res = card.getRank(1);

//             assert.equal(res, 2);
//         });
//     });
// });
