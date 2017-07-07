let sharedObject = require('./p05_sharedObject').sharedObject;
const expect = require('chai').expect;

describe("Tests Shared Object", function () {

    describe("Initialize Tests", function () {
        it("Test init value name", function () {
            expect(sharedObject.name).to.be.null;
        });

        it("Test init value income", function () {
            expect(sharedObject.income).to.be.null;
        });
    });

    describe("Change Name", function () {
        beforeEach(function () {
            sharedObject = require('./p05_sharedObject').sharedObject;
        });

        it("Test change name with empty String", function () {
            sharedObject.changeName('');
            expect(sharedObject.name).to.be.null;
        });

        it("Test change name with empty String", function () {
            sharedObject.changeName('newName');
            console.log(sharedObject.name);
            expect(sharedObject.name).to.be.equal('newName');
        });

    });

});

