function solution(input) {
    switch (input) {
        case 'upvote':
            this.upvotes++;
            break;
        case 'downvote':
            this.downvotes++;
            break;
        case 'score':
            let currUpvotes = this.upvotes;
            let currDownvotes = this.downvotes;
            let rating = 'new';
            if (currUpvotes + currDownvotes >= 10) {
                if (currUpvotes > 0.66 * (currUpvotes + currDownvotes)) {
                    rating = 'hot'
                } else if (currDownvotes > currUpvotes) {
                    rating = 'unpopular';
                } else if (currUpvotes > 100 || currDownvotes > 100) {
                    rating = 'controversial';
                }

                if (currUpvotes + currDownvotes > 50) {
                    let modifier = Math.ceil(0.25 * Math.max(currUpvotes, currDownvotes));
                    currUpvotes += modifier;
                    currDownvotes += modifier;
                }
            }

            let score = currUpvotes - currDownvotes;
            return [currUpvotes, currDownvotes, score, rating];
    }
}