function solve() {
    let url = 'https://judgetests.firebaseio.com/schedule/';
    let id = 'depot';
    let busStop = '';

    let shouldThrow = false;

    function depart() {
        let req = {
            url: url + id + '.json',
            method: 'GET',
            success: f1,
            error: error
        };

        $.ajax(req);
    }

    function f1(data) {
        $('#info').find('span').text(`Next stop ${data.name}`);
        $('#depart').attr("disabled", true);
        $('#arrive').removeAttr("disabled");

        busStop = data.name;
        id = data.next;
        shouldThrow = true;
    }

    function error() {
        $('.info').text('Error');
        $('#depart').attr("disabled", true);
        $('#arrive').attr("disabled", true);
    }

    function arrive() {
        $('.info').text(`Arriving at ${busStop}`);
        $('#depart').removeAttr("disabled");
        $('#arrive').attr("disabled", true);
    }

    return {
        depart,
        arrive
    };
}