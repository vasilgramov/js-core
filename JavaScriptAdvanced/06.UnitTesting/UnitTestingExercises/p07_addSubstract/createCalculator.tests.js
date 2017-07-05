// const createCalculator = require('./createCalculator').createCalculator;
createCalculator = function () {
    let value = 0;
    return {
        add: function(num) { value += num; },
        subtract: function(num) { value -= Number(num); },
        get: function() { return value; }
    }
};
const expect = require('../chai').expect;

describe("Calculator functionality tests", function () {
    let calc;

    beforeEach(function () {
        calc = createCalculator();
    });

    describe("General Tests", function () {
        it("initialized value to be zero", function () {
            expect(calc.get()).to.be.equal(0);
        });


        it("should work adding positive value", function () {
            calc.add(777);
            expect(calc.get()).to.be.equal(777);
        });

        it("should work adding negative value", function () {
            calc.add(-777);
            expect(calc.get()).to.be.equal(-777);
        });

        it("should work adding positive fraction value", function () {
            calc.add(3.14);
            expect(calc.get()).to.be.closeTo(3.14, 0.001);
        });

        it("should work adding negative fraction value", function () {
            calc.add(-3.14);
            expect(calc.get()).to.be.closeTo(-3.14, 0.001);
        });

        it("should work subtract positive value", function () {
            calc.subtract(777);
            expect(calc.get()).to.be.equal(-777);
        });

        it("should work subtract negative value", function () {
            calc.subtract(-777);
            expect(calc.get()).to.be.equal(+777);
        });

        it("should work subtract positive fraction value", function () {
            calc.subtract(3.14);
            expect(calc.get()).to.be.closeTo(-3.14, 0.001);
        });

        it("should work subtract negative fraction value", function () {
            calc.subtract(-3.14);
            expect(calc.get()).to.be.closeTo(3.14, 0.001);
        });
    });

    describe("Special Tests", function () {
        it("should return NaN string add parameter", function () {
            calc.add("pesho");
            console.log(calc.get());
            expect(calc.get()).to.be.NaN;
        });

        it("should return NaN string subtract parameter", function () {
            calc.subtract("gosho");
            expect(calc.get()).to.be.NaN;
        });

        it("add two parameters", function () {
            calc.add('7');
            calc.add(5);
            expect(calc.get()).to.be.equal(12);
        });
    });

});