function calendar(date) {
    let day =  date[0];
    let month = date[1] - 1;
    let year = date[2];

    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let table = $('<table>')
        .append($(`<caption>${monthNames[month]} ${year}</caption>`))
        .append($('<tbody>')
            .append($('<tr>')
                .append($('<th>Mon</th>'))
                .append($('<th>Tue</th>'))
                .append($('<th>Wed</th>'))
                .append($('<th>Thu</th>'))
                .append($('<th>Fri</th>'))
                .append($('<th>Sat</th>'))
                .append($('<th>Sun</th>')))
            .append($('<tr>')));


    let startDate = new Date(year, month, 0);
    for (let i = 0; i < startDate.getDay(); i++) {
        $(table.find('tbody tr').last()).append($('<td>'));
    }

    let totalDays = /*daysInMonth(month + 1, year)*/startDate.getDate();
    let dayCount = 1;
    for (var i = startDate.getDay(); i < 7; i++) {
        if (dayCount === day) {
            $(table.find('tbody tr').last()).append($(`<td class="today">${dayCount++}</td>`));
        } else {
            $(table.find('tbody tr').last()).append($(`<td>${dayCount++}</td>`));
        }
    }

    let fullWeeks = Math.floor((totalDays - dayCount) / 7);
    for (let i = 0; i < fullWeeks; i++) {
        $(table.find('tbody').append($('<tr>')));

        for (let j = 0; j < 7; j++) {
            if (dayCount === day) {
                $(table.find('tbody tr').last()).append($(`<td class="today">${dayCount++}</td>`));
            } else {
                $(table.find('tbody tr').last()).append($(`<td>${dayCount++}</td>`));
            }
        }
    }

    if (dayCount < totalDays) {
        $(table.find('tbody').append($('<tr>')));

        for (let i = 0; i < 7; i++) {
            if (dayCount > totalDays) {
                $(table.find('tbody tr').last()).append($(`<td>`));
            } else {
                if (dayCount === day) {
                    $(table.find('tbody tr').last()).append($(`<td class="today">${dayCount++}</td>`));
                } else {
                    $(table.find('tbody tr').last()).append($(`<td>${dayCount++}</td>`));
                }
            }
        }
    }

    table.appendTo($('#content'));

    function daysInMonth(month,year) {
        return new Date(year, month, 0).getDate();
    }
}