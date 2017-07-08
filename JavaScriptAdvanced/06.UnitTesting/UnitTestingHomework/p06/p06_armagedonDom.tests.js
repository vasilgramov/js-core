const expect = require('chai').expect;
const jsdom = require('jsdom-global')();
const $ = require('jquery');

let nuke = require('./p06_armagedonDom').nuke;

describe("Test Armagedon", function () {
    let target = undefined;

    beforeEach(function () {
        document.body.innerHTML = `<body>
            <div id="target">
                <div class="nested target">
                    <p>This is some text</p>
                </div>
                <div class="target">
                    <p>Empty div</p>
                </div>
                <div class="inside">
                    <span class="nested">Some more text</span>
                    <span class="target">Some more text</span>
                </div>
            </div>
            </body>`;

        target = $('#target');
    });


    it("Test with invalid selector", function () {
        let selector1 = '.nested';
        let selector2 = 'pesho';

        let oldHtml = target.html();
        nuke(selector1, selector2);
        expect(target.html()).to.be.equal(oldHtml);
    });

    it("Test with two equal selectors", function () {
        let selector1 = '.nested';
        let selector2 = '.nested';

        let oldHtml = target.html();
        nuke(selector1, selector2);
        expect(target.html()).to.be.equal(oldHtml);
    });

    it("Test with two valid selectors", function () {
        let selector1 = '.nested';
        let selector2 = '.target';

        let oldHtml = $(target).html();
        nuke(selector1, selector2);
        expect(target.html()).to.not.equal(oldHtml);
    });

    it("Test with two valid selectors not remove", function () {
        let selector1 = '.nested';
        let selector2 = '.inside';

        let oldHtml = target.html();
        nuke(selector1, selector2);
        expect(target.html()).to.be.equal(oldHtml);
    });

});
