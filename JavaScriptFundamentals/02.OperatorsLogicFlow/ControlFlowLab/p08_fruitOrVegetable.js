function isFruitOrVegetable(word) {
    switch (word) {
        // banana, apple, kiwi, cherry, lemon, grapes, peach
        case "banana":
        case "apple":
        case "kiwi":
        case "cherry":
        case "lemon":
        case "grapes":
        case "peach":
            console.log("fruit");
            break;
            //  tomato, cucumber, pepper, onion, garlic, parsley
        case "tomato":
        case "cucumber":
        case "pepper":
        case "onion":
        case "garlic":
        case "parsley":
            console.log("vegetable");
            break;
        default:
            console.log("unknown");
            break;
    }
}