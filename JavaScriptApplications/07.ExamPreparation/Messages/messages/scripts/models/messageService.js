let messageService = (() => {

    function loadReceivedMessages() {
        let endPoint = `messages?query={"recipient_username":"${sessionStorage.getItem('username')}"}`;
        return requester.get('appdata', endPoint, 'kinvey');
    }

    function loadSentMessages() {
        let endPoint = `messages?query={"sender_username":"${sessionStorage.getItem('username')}"}`;
        return requester.get('appdata', endPoint, 'kinvey');
    }
    
    function getAllUsers() {
        return requester.get('user', '', 'kinvey');
    }

    function sendMessage(senderUsername, senderName, recipientUsername, text) {
        let data = {
            sender_username: senderUsername,
            sender_name: senderName,
            recipient_username: recipientUsername,
            text: text
        };

        return requester.post('appdata', 'messages', 'kinvey', data);
    }

    function deleteMessage(messageId) {
        return requester.remove('appdata', 'messages/' + messageId, 'kinvey');
    }


    return {
        loadReceivedMessages,
        loadSentMessages,
        getAllUsers,
        sendMessage,
        deleteMessage
    };

})();