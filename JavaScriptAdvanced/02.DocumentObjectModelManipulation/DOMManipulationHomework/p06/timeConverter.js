function attachEventsListeners() {

    let d = document.getElementById('daysBtn');
    d.addEventListener('click', day);

    let h = document.getElementById('hoursBtn');
    h.addEventListener('click', hours);

    let m = document.getElementById('minutesBtn');
    m.addEventListener('click', minute);

    let s = document.getElementById('secondsBtn');
    s.addEventListener('click', second);

    function day() {
        let currentDays = Number(document.getElementById('days').value);
        document.getElementById('hours').value = currentDays * 24;
        document.getElementById('minutes').value = currentDays * 24 * 60;
        document.getElementById('seconds').value = currentDays * 24 * 60 * 60;
    }

    function hours() {
        let currentHours = Number(document.getElementById('hours').value);
        document.getElementById('days').value = currentHours / 24;
        document.getElementById('minutes').value = currentHours * 60;
        document.getElementById('seconds').value = currentHours * 60 * 60;
    }

    function minute() {
        let currentMinutes = Number(document.getElementById('minutes').value);
        document.getElementById('days').value = currentMinutes / (24* 60);
        document.getElementById('hours').value = currentMinutes / (60);
        document.getElementById('seconds').value = currentMinutes * 60;
    }

    function second() {
        let currentSeconds = Number(document.getElementById('seconds').value);
        document.getElementById('days').value = currentSeconds / (24 * 60 * 60);
        document.getElementById('hours').value = currentSeconds / (60 * 60);
        document.getElementById('minutes').value = currentSeconds / 60;
    }
}