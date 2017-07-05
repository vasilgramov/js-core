const rgbToHexColor = require('./rgbToHex').rgbToHexColor;
const expect = require('../chai').expect;

describe("redgreenblue to hex converter", function () {
    describe("General Tests", function () {
        it("should work with valid large parameters", function () {
            expect(rgbToHexColor(255, 158, 170)).to.be.equal("#FF9EAA");
        });

        it("should work with valid small parameters return padded values", function () {
            expect(rgbToHexColor(12, 13, 14)).to.be.equal("#0C0D0E");
        });

        it("edge case lowest values", function () {
            expect(rgbToHexColor(0, 0, 0)).to.be.equal("#000000");
        });

        it("edge case biggest values", function () {
            expect(rgbToHexColor(255, 255, 255)).to.be.equal("#FFFFFF");
        });
    });

    describe("Special Tests", function () {
        it("negative red", function () {
            expect(rgbToHexColor(-1, 0, 0)).to.be.undefined;
        });

        it("negative green", function () {
            expect(rgbToHexColor(0, -1, 0)).to.be.undefined;
        });

        it("negative blue", function () {
            expect(rgbToHexColor(0, 0, -1)).to.be.undefined;
        });

        it("overflow red", function () {
            expect(rgbToHexColor(256, 0, 0)).to.be.undefined;
        });

        it("overflow green", function () {
            expect(rgbToHexColor(0, 256, 0)).to.be.undefined;
        });

        it("overflow blue", function () {
            expect(rgbToHexColor(0, 0, 256)).to.be.undefined;
        });

        it("fraction red", function () {
            expect(rgbToHexColor(3.14, 0, 0)).to.be.undefined;
        });

        it("fraction green", function () {
            expect(rgbToHexColor(0, 3.14, 0)).to.be.undefined;
        });

        it("fraction blue", function () {
            expect(rgbToHexColor(0, 0, 3.14)).to.be.undefined;
        });
    });
});