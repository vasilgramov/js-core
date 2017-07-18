class MailBox {

    constructor() {
        this.messages = [];
    }

    get messageCount() {
        return this.messages.length;
    }

    addMessage(subject, text) {
        this.messages.push({
            subject: subject,
            text: text});

        return this;
    }

    deleteAllMessages() {
        this.messages = [];
    }

    findBySubject(substr) {
        let result = [];

        for (let msg of this.messages) {
            if (msg.subject.indexOf(substr) !== -1) {
                let subject = msg.subject;
                let text = msg.text;
                result.push({
                    subject, text
                });
            }
        }

        return result;
    }

    toString() {
        if (this.messages.length === 0) {
            return ` * (empty mailbox)`;
        }

        let result = '';
        for (let msg of this.messages) {
            result += `[${msg.subject}] ${msg.text}\n`
        }

        return result.trim();
    }
}