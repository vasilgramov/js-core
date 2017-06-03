function count(target, text) {
    let count = 0;
    while (text.indexOf(target) > 0) {
        text = text.substring(text.indexOf(target) + 1);
        count++;
    }


    console.log(count);
}

count('ma', 'Marine mammal training is the training and caring for marine life such as, dolphins, killer whales, sea lions, walruses, and other marine mammals. It is also a duty of the trainer to do mental and physical exercises to keep the animal healthy and happy.');