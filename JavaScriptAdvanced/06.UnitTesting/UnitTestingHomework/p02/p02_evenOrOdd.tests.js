let isOddOrEven = require('./p02_evenOrOdd').isOddOrEven;
let expect = require('../chai').expect;

describe("Tests Even or Odd Function", function () {

       it("Should return odd 01", function () {
            expect(isOddOrEven('PESHO')).to.be.equal('odd');
       });

        it("Should return odd 02", function () {
            expect(isOddOrEven('PESHO00')).to.be.equal('odd');
        });

        it("Should return even 02", function () {
            expect(isOddOrEven('GOSH')).to.be.equal('even');
        });

        it("Should return even 02", function () {
            expect(isOddOrEven('GOSH00')).to.be.equal('even');
        });


        it("Should Return undefined 1", function () {
            expect(isOddOrEven(6)).to.be.undefined;
        });

        it("Should Return undefined 2", function () {
            expect(isOddOrEven(6)).to.be.undefined;
        });

});