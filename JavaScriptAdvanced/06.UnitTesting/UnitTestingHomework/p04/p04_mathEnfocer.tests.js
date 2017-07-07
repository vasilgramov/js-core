let mathEnforcer = require('./p04_mathEnfocer').mathEnforcer;
let expect = require('../chai').expect;

console.log(typeof expect);

describe("Math Enforcer Tests", function () {

    describe("General addFive Tests", function () {

        it("Should work correctly 1", function () {
            expect(mathEnforcer.addFive(4)).to.be.equal(9);
        });

        it("Should work correctly 2", function () {
            expect(mathEnforcer.addFive(-4)).to.be.equal(1);
        });

        it("Should work correctly 3", function () {
            expect(mathEnforcer.addFive(3.14)).to.be.closeTo(8.14, 0.01);
        });

        it("Should work correctly 4", function () {
            expect(mathEnforcer.addFive(-3.5)).to.be.closeTo(1.5, 0.01);
        });

    });

    describe("General substractTen Tests", function () {

        it("Should work correctly 1", function () {
            expect(mathEnforcer.subtractTen(15)).to.be.equal(5);
        });

        it("Should work correctly 2", function () {
            expect(mathEnforcer.subtractTen(-4)).to.be.equal(-14);
        });

        it("Should work correctly 3", function () {
            expect(mathEnforcer.subtractTen(15.5)).to.be.closeTo(5.5, 0.01);
        });

        it("Should work correctly 4", function () {
            expect(mathEnforcer.subtractTen(-13.5)).to.be.closeTo(-23.5, 0.01);
        });

    });

    describe("General sum Tests", function () {

        it("Should work correctly 1", function () {
            expect(mathEnforcer.sum(15, 15)).to.be.equal(30);
        });

        it("Should work correctly 2", function () {
            expect(mathEnforcer.sum(-4, -4)).to.be.equal(-8);
        });

        it("Should work correctly 3", function () {
            expect(mathEnforcer.sum(15.5, 15.5)).to.be.closeTo(31, 0.01);
        });

        it("Should work correctly 4", function () {
            expect(mathEnforcer.sum(-13.5, -13.5)).to.be.closeTo(-27, 0.01);
        });

    });

    describe("Special Tests", function () {

        it("Should return undefined 1", function () {
            expect(mathEnforcer.addFive('pesho')).to.be.undefined;
        });

        it("Should return undefined 12", function () {
            expect(mathEnforcer.subtractTen('gosho')).to.be.undefined;
        });

        it("Should return undefined 12", function () {
            expect(mathEnforcer.sum('gosho', 1)).to.be.undefined;
        });

        it("Should return undefined 12", function () {
            expect(mathEnforcer.sum(1, 'gosho')).to.be.undefined;
        });

        it("Should return undefined 12", function () {
            expect(mathEnforcer.sum('gosho', 'gosho')).to.be.undefined;
        });
    });

});