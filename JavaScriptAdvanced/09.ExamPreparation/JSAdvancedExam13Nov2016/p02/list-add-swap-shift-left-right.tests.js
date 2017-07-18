let createList = require('./list-add-swap-shift-left-right').createList;
let expect = require('chai').expect;

describe("List Add Swap Shift Left / Right", function () {
    let list;

    beforeEach(function () {
        list = createList();
    });

    describe("Test Add", function () {

        it("empty list", function () {
            expect(list.toString()).to.be.equal("");
        });

        it("add one element", function () {
            list.add(1);
            expect(list.toString()).to.be.equal('1');
        });

        it("add many elements from different types", function () {
            list.add(1);
            list.add("one");
            list.add("three");

            expect(list.toString()).to.be.equal("1, one, three")
        });
    });

    describe("Shift Left Tests", function () {

        it("shift left empty collection", function () {
            expect(list.toString()).to.be.equal("");
            list.shiftLeft();
            expect(list.toString()).to.be.equal("");
        });

        it("shift left single element", function () {
            list.add(3);

            expect(list.toString()).to.be.equal("3");
            list.shiftLeft();
            expect(list.toString()).to.be.equal("3");
        });

        it("shift left many elements", function () {
            list.add(1);
            list.add('2');
            list.add('three');

            list.shiftLeft();
            list.shiftLeft();

            expect(list.toString()).to.be.equal('three, 1, 2')
        })
    });

    describe("Shift Right Tests", function () {

        it("shift right empty collection", function () {
            expect(list.toString()).to.be.equal("");
            list.shiftRight();
            expect(list.toString()).to.be.equal("");
        });

        it("shift right single element", function () {
            list.add(1);

            expect(list.toString()).to.be.equal('1');
            list.shiftRight();
            expect(list.toString()).to.be.equal('1');
        });

        it("shift right many elements", function () {
            list.add(1);
            list.add('2');
            list.add('three');

            list.shiftRight();
            list.shiftRight();

            expect(list.toString()).to.be.equal('2, three, 1')
        });
    });

    describe("Swap Tests", function () {
        it('with a negative first index, should return false', function () {
            list.add('one');
            list.add(2);
            expect(list.swap(-5, 1)).to.equal(false);
        });

        it('with a negative first index, should not change the collection', function () {
            list.add('one');
            list.add('two');
            list.swap(-5, 1);
            expect(list.toString()).to.equal("one, two");
        });

        it('with a non integer first index, should return false', function () {
            list.add('one');
            list.add('two');
            expect(list.swap('stamat', 1)).to.equal(false);
        });

        it('with a non integer first index, should not change the collection', function () {
            list.add('one');
            list.add('two');
            list.swap([4, 13], 1);
            expect(list.toString()).to.equal("one, two");
        });

        it('with first index equal to number of elements, should return false', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            expect(list.swap(3, 1)).to.equal(false);
        });

        it('with first index equal to number of elements, should not change the collection', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            list.swap(3, 1);
            expect(list.toString()).to.equal("one, two, three");
        });

        it('with a negative second index, should return false', function () {
            list.add('one');
            list.add(2);
            expect(list.swap(0, -1)).to.equal(false);
        });

        it('with a negative second index, should not change the collection', function () {
            list.add('one');
            list.add('two');
            list.swap(0, -1);
            expect(list.toString()).to.equal("one, two");
        });

        it('with a non integer second index, should return false', function () {
            list.add('one');
            list.add('two');
            expect(list.swap(0, 'stamat')).to.equal(false);
        });

        it('with a non integer second index, should not change the collection', function () {
            list.add('one');
            list.add('two');
            list.swap(0, [4, 13]);
            expect(list.toString()).to.equal("one, two");
        });

        it('with second index equal to number of elements, should return false', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            expect(list.swap(0, 3)).to.equal(false);
        });

        it('with second index equal to number of elements, should not change the collection', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            list.swap(0, 3);
            expect(list.toString()).to.equal("one, two, three");
        });

        it('with equal indexes, should return false', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            expect(list.swap(1, 1)).to.equal(false);
        });

        it('with equal indexes, collection should stay the same', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            list.swap(1, 1);
            expect(list.toString()).to.equal("one, two, three");
        });

        it('with zero first index, should return true', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            expect(list.swap(0, 1)).to.equal(true)
        });

        it('with zero second indexes, should return true', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            expect(list.swap(2, 0)).to.equal(true);
        });

        it('with zero first index, should swap the values', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            list.swap(0, 2);
            expect(list.toString()).to.equal("three, two, one");
        });

        it('with zero second index, should swap the values', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            list.swap(1, 0);
            expect(list.toString()).to.equal("two, one, three");
        });
    });
});