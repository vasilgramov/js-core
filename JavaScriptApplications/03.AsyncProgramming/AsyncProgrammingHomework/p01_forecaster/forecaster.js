function attachEvents() {

    $('#submit').click(getWeather);

    function getWeather() {
        let header = {
            url: 'https://judgetests.firebaseio.com/locations.json',
            method: 'GET'
        };


        $.ajax(header)
            .then(getLocationCode)
            .catch(displayError);
    }

    function getLocationCode(data) {
        let locationName = $('#location').val();

        for (let d of data) {
            if (d['name'] === locationName) {

                let currentConditionURL = `https://judgetests.firebaseio.com/forecast/today/${d['code']}.json`;
                let currentCondition = $.ajax({
                    url: currentConditionURL,
                    method: 'GET'
                });

                let threeDaysForecastURL = `https://judgetests.firebaseio.com/forecast/upcoming/${d['code']}.json`;
                let threeDaysForecast = $.ajax({
                    url: threeDaysForecastURL,
                    method: 'GET'
                });


                Promise.all([currentCondition, threeDaysForecast])
                    .then(getForecast)
                    .catch(displayError);
            }
        }
    }

    function getForecast([currentCondition, threeDaysCondition]) {
        console.log(currentCondition);
        console.log(threeDaysCondition);

        $('#forecast').css('display', '');

        let weatherSymbols = new Map();
        weatherSymbols.set('Sunny', '&#x2600;');
        weatherSymbols.set('Partly sunny', '&#x26C5;');
        weatherSymbols.set('Overcast', '&#x2601;');
        weatherSymbols.set('Rain', '&#x2614;');
        weatherSymbols.set('Degrees', '&#176;');

        // °
        let icon = weatherSymbols.get(currentCondition['forecast']['condition']);
        let name = currentCondition['name'];
        let low = currentCondition['forecast']['low'] + '°';
        let high = currentCondition['forecast']['high'] + '°';
        let condition = currentCondition['forecast']['condition'];

        $('#current').empty();
        $('#current')
            .append($('<div class="label">Current conditions</div>'))
            .append($(`<span class="condition symbol">${icon}</span>`))
                .append($('<span class="condition">')
                    .append($(`<span class="forecast-data">${name}</span>`))
                    .append($(`<span class="forecast-data">${low}/${high}</span>`))
                    .append($(`<span class="forecast-data">${condition}</span>`))
                );



        $('#upcoming').empty();
        $('#upcoming')
            .append($('<div class="label">Three-day forecast</div>'));

        let days = threeDaysCondition['forecast'];
        for (let d of days) {
            icon = weatherSymbols.get(d['condition']);
            low = d['low'] + '°';
            high = d['high'] + '°';
            condition =  d['condition'];

            $('#upcoming')
                .append($('<span class="upcoming">')
                    .append($(`<span class="symbol">${icon}</span>`))
                    .append($(`<span class="forecast-data">${low}/${high}</span>`))
                    .append($(`<span class="forecast-data">${condition}</span>`)));
        }
    }
    
    function displayError(error) {
        // TODO: DISPLAY ERROR
    }
}