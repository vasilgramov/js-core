const isSymmetric = require('./isSymmetric').isSymmetric;
const expect = require('../chai').expect;

describe("isSymmetric - test if array is symmetric", function () {
   it("check if isSymmetric is function", function () {
        expect(typeof isSymmetric).to.be.equal("function");
   });

    describe("General Tests", function () {
        it("should return true even length array", function () {
            expect(isSymmetric([1, 2, 3, 3, 2, 1])).to.be.true;
        });

        it("should return false even length array", function () {
            expect(isSymmetric([1, 2, 3, 2, 2, 1])).to.be.false;
        });

        it("should return true odd length array", function () {
            expect(isSymmetric([1, 2, 3, 2, 1])).to.be.true;
        });

        it("should return false odd length array", function () {
            expect(isSymmetric([1, 2, 3, 3, 1])).to.be.false;
        });

        it("weird parameters should return true", function () {
            expect(isSymmetric([1, "pesho", new Date(), { name: 'gosho'}, new Date(), "pesho", 1])).to.be.true;
        });
    });

    describe("Invalid parameters", function () {
        it("passed not array should return false", function () {
            expect(isSymmetric("pesho")).to.be.false;
        });

        it("passed no arguments should return false", function () {
            expect(isSymmetric()).to.be.false;
        });

        it("passed NaN no idea what will happen", function () {
            expect(isSymmetric(NaN)).to.be.false;
        })
    });
});