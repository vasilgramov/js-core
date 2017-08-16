let postService = (() => {

    function loadAllPosts() {
        return requester.get('appdata', 'posts', 'kinvey');
    }

    function createPost(author, title, url, imageUrl, description) {
        let postData = {
            author,
            title,
            url,
            imageUrl,
            description
        };

        return requester.post('appdata', 'posts', 'kinvey', postData);
    }

    function getPost(postId) {
        return requester.get('appdata', 'posts/' + postId, 'kinvey');
    }

    function getPostComments(postId) {
        let endpoint = `comments?query={"postId":"${postId}"}`;

        return requester.get('appdata', endpoint, 'kinvey');
    }

    function postComment(author, content, postId) {

        let commentData = {
            author,
            content,
            postId
        };

        return requester.post('appdata', 'comments', 'kinvey', commentData);
    }

    function deleteComment(commentId) {
        return requester.remove('appdata', 'comments/' + commentId, 'kinvey');
    }
    
    function getMyPosts(username) {
        let endpoint = `posts?query={"author":"${username}"}`;
        return requester.get('appdata', endpoint, 'kinvey');
    }

    function deletePost(postId) {
        return requester.remove('appdata', 'posts/' + postId, 'kinvey');
    }

    function editPost(postId, author, title, url, imageUrl, description) {
        let postData = {
            author,
            title,
            url,
            imageUrl,
            description
        };

        return requester.update('appdata', 'posts/' + postId, 'kinvey', postData);
    }

    return {
        loadAllPosts,
        createPost,
        getPost,
        getPostComments,
        postComment,
        deleteComment,
        getMyPosts,
        deletePost,
        editPost
    }

})();