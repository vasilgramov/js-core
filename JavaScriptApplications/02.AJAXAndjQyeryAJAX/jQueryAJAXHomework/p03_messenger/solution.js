function attachEvents() {
    $('#submit').click(sendMessage);

    $('#refresh').click(getMessages);
    let url = 'https://messenger-5628d.firebaseio.com/messenger.json';


    function sendMessage() {
        let author = $('#author').val();
        let content = $('#content').val();
        console.log(Date.now());

        let json = {
            author: author,
            content: content,
            timestamp: Date.now()
        };


        let req = {
            url: url,
            method: 'POST',
            data: JSON.stringify(json),
            success: getMessages,
        };

        $.ajax(req);
    }

    function getMessages() {
        let req = {
            url: url,
            method: 'GET',
            success: displayData,
        };

        $.ajax(req);
    }

    function displayData(data) {
        let text = '';

        for (let key in data) {
            let user = data[key];
            text += `${user['author']}: ${user['content']}` + '\n';
        }

        let content = $('#messages').text(text.trim());
    }
}