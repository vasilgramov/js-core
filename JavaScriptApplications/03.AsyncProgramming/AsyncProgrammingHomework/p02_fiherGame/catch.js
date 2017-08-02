function attachEvents() {

    const username = 'Vasil';
    const password = '1234';

    const baseURL = 'https://baas.kinvey.com/appdata/kid_Hk7faWywb/biggestCatches';

    const catches = $('#catches');
    const addForm = $('#addForm');


    $('.load').click(loadCatches);
    $('.add').click(addCatch);

    function loadCatches() {
        let req = {
            url: baseURL,
            method: 'GET',
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            }
        };

        $.ajax(req)
            .then(displayCatches)
            .catch(displayError);
    }

    function displayCatches(data) {
        catches.empty();

        for (let d of data) {
            catches
                .append($('<div>').addClass("catch").attr("data-id", d._id)
                    .append($('<label>').text('Angler'))
                    .append($('<input type="text" class="angler">').val(d.angler))
                    .append($('<label>').text('Weight'))
                    .append($('<input type="text" class="weight">').val(d.weight))
                    .append($('<label>').text('Species'))
                    .append($('<input type="text" class="species">').val(d.species))
                    .append($('<label>').text('Location'))
                    .append($('<input type="text" class="location">').val(d.location))
                    .append($('<label>').text('Bait'))
                    .append($('<input type="text" class="bait">').val(d.bait))
                    .append($('<label>').text('Capture Time'))
                    .append($('<input type="number" class="captureTime">').val(d.captureTime))
                    .append($('<button class="update">').text('Update').click(updateCatch))
                    .append($('<button class="delete">').text('Delete').click(deleteCatch))
                );
        }
    }
    
    function addCatch() {
        let data = {
            angler: addForm.find('.angler').val(),
            weight: Number(addForm.find('.weight').val()),
            species: addForm.find('.species').val(),
            location: addForm.find('.location').val(),
            bait: addForm.find('.bait').val(),
            captureTime: Number(addForm.find('.captureTime').val())
        };

        let req = {
            url: baseURL,
            method: 'POST',
            contentType: "application/json",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            data: JSON.stringify(data)
        };

        $.ajax(req)
            .then(loadCatches)
            .catch(displayError);
    }
    
    function updateCatch() {
        let updatedId = $(this).parent().attr('data-id');
        let updatedCatch = $(this).parent();
        let data = {
            angler: updatedCatch.find('.angler').val(),
            weight: Number(updatedCatch.find('.weight').val()),
            species: updatedCatch.find('.species').val(),
            location: updatedCatch.find('.location').val(),
            bait: updatedCatch.find('.bait').val(),
            captureTime: Number(updatedCatch.find('.captureTime').val())
        };


        let req = {
            url: baseURL + `/${updatedId}`,
            method: 'PUT',
            contentType: "application/json",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            data: JSON.stringify(data)
        };

        $.ajax(req)
            .then(loadCatches)
            .catch(displayError);
    }

    function deleteCatch() {
        let dataId = $(this).parent().attr('data-id');

        let req = {
            url: baseURL + `/${dataId}`,
            method: 'DELETE',
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            }
        };

        $.ajax(req)
            .then(loadCatches)
            .catch(displayError);
    }

    function displayError(error) {
        console.log(error);
    }
}