function print(n) {
    console.log("<ul>");

    for (let i = 1; i <= n; i++) {
        if (i % 2 == 1) {
            console.log(`  <li><span style='color:green'>${i}</span></li>`);
        } else {
            console.log(`  <li><span style='color:blue'>${i}</span></li>`);
        }
    }

    console.log("</ul>")
}

print(10);