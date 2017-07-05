function solve() {
    let elements = [];
    return {
        add: function (element) {
            elements.push(element);
            elements = elements.sort((a, b) => a - b);
            this.size++;
        },
        remove: function (index) {
            if (index >= 0 && index < elements.length) {
                let newElements = [];
                for (let i = 0; i < elements.length; i++) {
                    if (i !== index) {
                        newElements.push(elements[i]);
                    }
                }
                this.size--;
                elements = newElements;
            }
        },
        get: function (index) {
            if (index >= 0 && index < elements.length) {
                return elements[index];
            }
        },
        size: 0
    };
}

let sortedList = solve();

sortedList.add(5);
sortedList.add(3);

sortedList.remove(0);

console.log(sortedList.size);