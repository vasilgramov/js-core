function search() {
    let searchText = $('#searchText').val();
    let all = $('#towns').find('li');

    let count = 0;
    for (let i = 0; i < all.length; i++) {
        let current = all[i];
        if (current.textContent.includes((searchText))) {
            $(current).css("font-weight","bold");
            count++;
        } else {
            $(current).css("font-weight","");
        }
    }

    $('#result').text(`${count} matches found.`);
}