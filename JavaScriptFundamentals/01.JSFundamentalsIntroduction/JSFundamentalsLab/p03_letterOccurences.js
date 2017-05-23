/**
 * Created by vladix on 5/22/17.
 */
function countLetter(string, letter) {
    let count = 0;
    for (let obj of string) {
        if (obj == letter) {
            count++;
        }
    }

    console.log(count);
}

countLetter("6666", 6);