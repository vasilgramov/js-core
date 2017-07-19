let Sumator = require('./sumator').Sumator;
let expect = require('chai').expect;

describe("Tests Summator", function () {
    let mySumator;

    beforeEach(function () {
        mySumator = new Sumator();
    });

    describe("Method Exists Tests", function () {

        it("test add exists", function () {
            expect(Sumator.prototype.hasOwnProperty('add')).to.be.equal(true);
        });

        it("test sumNums exists", function () {
            expect(Sumator.prototype.hasOwnProperty('sumNums')).to.be.equal(true);
        });

        it("test removeByFilter exists", function () {
            expect(Sumator.prototype.hasOwnProperty('removeByFilter')).to.be.equal(true);
        });

        it("test toString exists", function () {
            expect(Sumator.prototype.hasOwnProperty('toString')).to.be.equal(true);
        });
    });

    describe("Test Add", function () {

        it("empty collection", function () {
            expect(mySumator.toString()).to.be.equal('(empty)');
        });

        it("adding single element", function () {
            mySumator.add(5);
            expect(mySumator.toString()).to.be.equal('5');
        });

        it("adding multiple elements", function () {
            mySumator.add(4);
            mySumator.add(7);
            mySumator.add(8);
            mySumator.add(10);
            mySumator.add(18);
            mySumator.add(-16);

            expect(mySumator.toString()).to.be.equal('4, 7, 8, 10, 18, -16')
        });

        it("adding a non number", function () {
            mySumator.add("three");

            expect(mySumator.toString()).to.be.equal('three');
        });
    });

    describe("Test Sum Number" , function () {

        it("sum empty collection", function () {
            expect(mySumator.sumNums()).to.be.equal(0);
        });

        it("sum one element", function () {
            mySumator.add(7);
            expect(mySumator.sumNums()).to.be.equal(7);
        });

        it("sum many elements", function () {
            mySumator.add(8);
            mySumator.add(1);
            mySumator.add(15);

            expect(mySumator.sumNums()).to.be.equal(24);
        });

        it("sum with non numbers", function () {
            mySumator.add(1);
            mySumator.add("one");
            mySumator.add("three");
            mySumator.add(9);

            expect(mySumator.sumNums()).to.be.equal(10);
        });
    });

    describe("Test Remove By Filter", function () {

        it("filter empty collection", function () {
            mySumator.removeByFilter(x => x > 10);

            expect(mySumator.toString()).to.be.equal('(empty)')
        });

        it("filter one element not successfully", function () {
            mySumator.add(5);
            mySumator.removeByFilter(x => x > 10);

            expect(mySumator.toString()).to.be.equal('5')
        });

        it("filter one element successfully", function () {
            mySumator.add(15);
            mySumator.removeByFilter(x => x > 10);

            expect(mySumator.toString()).to.be.equal('(empty)')
        });

        it("filter many elements not successfully", function () {
            mySumator.add(15);
            mySumator.add(25);
            mySumator.add(35);
            mySumator.add(36);

            mySumator.removeByFilter(x => x < 10);

            expect(mySumator.toString()).to.be.equal('15, 25, 35, 36')
        });

        it("filter many elements all successfully", function () {
            mySumator.add(15);
            mySumator.add(25);
            mySumator.add(35);
            mySumator.add(36);

            mySumator.removeByFilter(x => x > 10);

            expect(mySumator.toString()).to.be.equal('(empty)')
        });

        it("filter many elements not all successfully", function () {
            mySumator.add(15);
            mySumator.add(5);
            mySumator.add(25);
            mySumator.add(35);
            mySumator.add(7);
            mySumator.add(36);

            mySumator.removeByFilter(x => x > 10);

            expect(mySumator.toString()).to.be.equal('5, 7')
        })
    });
});