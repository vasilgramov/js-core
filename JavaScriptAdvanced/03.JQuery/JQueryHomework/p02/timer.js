function timer() {
    let startBtn = $('#start-timer');
    let stopBtn = $('#stop-timer');

    let h = $('#hours');
    let m = $('#minutes');
    let s = $('#seconds');

    let time = 0;

    startBtn.on('click', continueTimer);
    stopBtn.on('click', stopTimer);

    let timer;

    function continueTimer() {
        console.log('here');
        timer = setInterval(step, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function step() {
        time++;

        let hours =  ((Math.floor(time / 3600)));
        if ((hours + '').length <= 1) {
            hours = '0' + hours;
        }

        let minutes = ('0' + (Math.floor(time / 60)) % 60).slice(-2);
        let seconds = ('0' + (time % 60)).slice(-2);

        h.text(hours);
        m.text(minutes);
        s.text(seconds);
    }
}