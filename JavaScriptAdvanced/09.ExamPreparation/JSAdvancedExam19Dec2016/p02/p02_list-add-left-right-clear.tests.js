let makeList = require('./p02_list-add-left-right-clear').makeList;
let expect = require('chai').expect;

describe('Testing my list', function () {
    let myList;

    beforeEach(function () {
        myList = makeList();
    });

    describe('General Tests', function () {

        it('test initial', function () {
            expect(myList.toString()).to.be.equal('');
        });

        it('add left', function () {
            myList.addLeft('123');
            expect(myList.toString()).to.be.equal('123');
        });

        it('add right', function () {
            myList.addRight('321');
            expect(myList.toString()).to.be.equal('321');
        });

        it('addleft two elements', function () {
            myList.addLeft('1');
            myList.addLeft('2');
            expect(myList.toString()).to.be.equal('2, 1');
        });

        it('addright two elements', function () {
            myList.addRight('5');
            myList.addRight('6');
            expect(myList.toString()).to.be.equal('5, 6');
        });

        it('addleft addright', function () {
           myList.addLeft('1');
           myList.addRight(9);
           expect(myList.toString()).to.be.equal('1, 9');
        });

        it('addright addleft', function () {
            myList.addRight(7);
            myList.addLeft(6);
            expect(myList.toString()).to.be.equal('6, 7');
        });

        it('addright addleft addright', function () {
            myList.addRight(1);
            myList.addLeft(4);
            myList.addRight(8);
            expect(myList.toString()).to.be.equal('4, 1, 8');
        });

        it('addleft addright addleft', function () {
            myList.addLeft('1');
            myList.addRight('5');
            myList.addLeft('7');
            expect(myList.toString()).to.be.equal('7, 1, 5');
        });

        it('clear empty elements', function () {
           myList.clear();
           expect(myList.toString()).to.be.equal('');
        });

        it('add left then clear', function () {
            myList.addLeft('123');
            myList.clear();
            expect(myList.toString()).to.be.equal('');
        });

        it('add right then clear', function () {
           myList.addRight('321');
           myList.clear();
           expect(myList.toString()).to.be.equal('');
        });

        it('add some elements then clear v1', function () {
            myList.addLeft('1');
            myList.addLeft('2');
            myList.addLeft('3');
            myList.addRight('4');
            myList.addRight('5');
            myList.addRight('6');
            myList.clear();
            expect(myList.toString()).to.be.equal('');
        });
    });

    describe("Special Cases", function () {

        it("addleft undefined", function () {
            myList.addLeft(undefined);
            expect(myList.toString()).to.be.equal('');
        });

        it("addleft undefined", function () {
            myList.addLeft(null);
            expect(myList.toString()).to.be.equal('');
        });
    });

});