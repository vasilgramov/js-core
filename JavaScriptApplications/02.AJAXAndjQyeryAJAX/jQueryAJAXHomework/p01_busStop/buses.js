function getInfo() {
    
    let url = 'https://judgetests.firebaseio.com/businfo/';
    let stopId = Number($('#stopId').val());

    let req = {
        url: url + `${stopId}.json`,
        method: 'GET',
        success: displayData,
        error: displayError
    };

    $.ajax(req);

    function displayData(data) {
        $('#stopName').text(data.name);
        let buses = data.buses;
        let keys = Object.keys(buses);
        for (let key of keys) {
            $('#buses')
                .append($('<li>').text(`Bus ${key} arrives in ${buses[key]} minutes`));
        }
    }
    
    function displayError() {
        $('#stopName').text('Error');
    }
}