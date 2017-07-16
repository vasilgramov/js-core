function move(direction) {
    let children = $('#towns').children();
    for (let child of children) {
        if ($(child).is(':selected')) {
            if (direction < 0) {
                let prev = $(child).prev();
                if (prev.length !== 0) {
                    $(child).remove();
                    prev.before(child);
                }
            } else if (direction > 0) {
                let next = $(child).next();
                console.log(next);
                if (next.length !== 0) {
                    $(child).remove();
                    next.after(child);
                }
            }
        }
    }
}