function getModel() {
    let selector1;
    let selector2;
    let resultSelector;

    function init(s1, s2, resultS) {
        selector1 = $(s1);
        selector2 = $(s2);
        resultSelector = $(resultS);
    }

    function add() {
        let val1 = +selector1.val();
        let val2 = +selector2.val();

        resultSelector.val(val1 + val2);
    }

    function subtract() {
        let val1 = +selector1.val();
        let val2 = +selector2.val();

        resultSelector.val(val1 - val2);
    }

    return { init, add, subtract };
}