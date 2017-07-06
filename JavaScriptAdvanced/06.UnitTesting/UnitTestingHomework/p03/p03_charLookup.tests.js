let lookupChar = require('./p03_charLookup').lookupChar;
let expect = require('../chai').expect;

describe("Test Char at function", function () {

    describe("General Tests", function () {
        it("should return correct value", function () {
            expect(lookupChar('pesho', 1)).to.be.equal('e');
        });

        it("should return correct value", function () {
            expect(lookupChar('pesho', 0)).to.be.equal('p');
        });

        it("should return correct value", function () {
            expect(lookupChar('pesho', 4)).to.be.equal('o');
        });

        it("should return incorrect index", function () {
            expect(lookupChar('pesho', 5)).to.be.equal('Incorrect index');
        });

        it("should return incorrect index", function () {
            expect(lookupChar('pesho', 50)).to.be.equal('Incorrect index');
        });

        it("should return incorrect index", function () {
            expect(lookupChar('', -111)).to.be.equal('Incorrect index');
        });

        it("should return incorrect index", function () {
            expect(lookupChar('asd', 0.123)).to.be.undefined;
        });
    });

    describe("Special Cases", function () {
        it("Should return undefined 1", function () {
            expect(lookupChar(4, 4)).to.be.undefined;
        });

        it("Should return undefined 1", function () {
            expect(lookupChar("asdasd", {})).to.be.undefined;
        });

        it("Should return undefined 1", function () {
            expect(lookupChar({}, 4)).to.be.undefined;
        });

        it("Should return undefined 1", function () {
            expect(lookupChar('asd', 'asd')).to.be.undefined;
        });

        it("Should return undefined 1", function () {
            expect(lookupChar({}, {})).to.be.undefined;
        });
    });

});