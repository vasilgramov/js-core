let SortedList = require('./sortedList').SortedList;
let expect = require('chai').expect;

describe("Sorted List Tests", function () {
    let myList;

    beforeEach(function () {
        myList = new SortedList();
    });

    describe("Check Functions Exists Tests", function () {

        it("add exists", function () {
            expect(SortedList.prototype.hasOwnProperty('add')).to.be.equal(true);
        });

        it("remove exists", function () {
            expect(SortedList.prototype.hasOwnProperty('remove')).to.be.equal(true);
        });

        it("get exists", function () {
            expect(SortedList.prototype.hasOwnProperty('get')).to.be.equal(true);
        });

        it("vrfyRange exists", function () {
            expect(SortedList.prototype.hasOwnProperty('vrfyRange')).to.be.equal(true);
        });

        it("sort exists", function () {
            expect(SortedList.prototype.hasOwnProperty('sort')).to.be.equal(true);
        });

        it("size exists", function () {
            expect(SortedList.prototype.hasOwnProperty('size')).to.be.equal(true);
        });
    });

    describe("Add Tests", function () {

        it("with empty collection", function () {
            expect(myList.list.join(" ")).to.be.equal("");
        });

        it("add one element", function () {
            myList.add(1);
            expect(myList.list.join(" ")).to.be.equal("1");
        });

        it("add two elements", function () {
            myList.add(2);
            myList.add(-1);
            expect(myList.list.join(" ")).to.be.equal("-1 2");
        });

        it("add many elements", function () {
            myList.add(3);
            myList.add(5);
            myList.add(123);
            myList.add(1);
            myList.add(10);
            expect(myList.list.join(" ")).to.be.equal("1 3 5 10 123");
        });
    });

    describe("Verify Range Tests", function () {

        it("empty collection", function () {
            expect(() => myList.vrfyRange(0)).to.throw(Error, 'Collection is empty.')
        });

        it("index below 0", function () {
            myList.add(1);
            expect(() => myList.vrfyRange(-1)).to.throw(Error, 'Index was outside the bounds of the collection.');
        });

        it("index equal to list size", function () {
            myList.add(2);
            myList.add(1);
            expect(() => myList.vrfyRange(2)).to.throw(Error, 'Index was outside the bounds of the collection.');
        });

        it("index bigger than list size", function () {
            myList.add(3);
            expect(() => myList.vrfyRange(2)).to.throw(Error, 'Index was outside the bounds of the collection.');
        });
    });

    describe("Remove Tests", function () {

        it("remove from empty", function () {
            expect(() => myList.remove(0)).to.throw(Error, 'Collection is empty.');
        });

        it("remove one element", function () {
            myList.add(1);
            myList.remove(0);
            expect(myList.list.join(" ")).to.be.equal("");
        });

        it("remove one element v2", function () {
            myList.add(2);
            myList.add(1);
            myList.remove(0);
            expect(myList.list.join(" ")).to.be.equal("2");
        });

        it("remove many elements", function () {
            myList.add(2);
            myList.add(1);
            myList.add(-1);

            myList.remove(1);
            myList.remove(1);
            expect(myList.list.join(" ")).to.be.equal("-1");
        });
    });

    describe("Get Element Tests", function () {

        it("get element from empty collection", function () {
            expect(() => myList.get(0)).to.throw(Error, 'Collection is empty.');
        });

        it("get single element", function () {
            myList.add(5);
            expect(myList.get(0)).to.be.equal(5);
        });

        it("get many elements", function () {
            myList.add(-1);
            myList.add(10);
            myList.add(5);

            expect(myList.get(0)).to.be.equal(-1);
            expect(myList.get(1)).to.be.equal(5);
            expect(myList.get(2)).to.be.equal(10);
        });
    });

    describe("Size Tests", function () {

        it("empty collection size", function () {
            expect(myList.size).to.be.equal(0);
        });

        it("one element size", function () {
            myList.add(1);
            expect(myList.size).to.be.equal(1);
        });


        it("many element size", function () {
            myList.add(123);
            myList.add(1);
            myList.add(5);
            expect(myList.size).to.be.equal(3);
        });
    });
});