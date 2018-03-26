getData()
let allPosts = [];

// Gets data from Firebase
function getData() {
    $.ajax({
        url: 'https://kyle-personal-blog.firebaseio.com/posts.json?print=pretty',
        type: "GET",
        success: function (data) {
            console.log('success - data received');
            parseData(data);
            fixStyling();
        },
        error: function (error) {
            console.table('error: ' + error)
        }
    });
}

// Removes styling from Knook page
function fixStyling() {
    let post = document.querySelectorAll('#post-body');
    for (var i = 0; i < post.length; i++) {
        post[i].classList.remove('post-body');
        post[i].classList.add('post-content');
    }
}

// Parses data from Firebase's JSON data
function parseData(data) {
    let post = data;
    let keys = Object.keys(post);

    for (var i = 0; i < keys.length; i++) {
        let k = keys[i]
        let dataObj = {
            k: k,
            title: post[k].title,
            content: post[k].body,
            author: post[k].author,
            date: post[k].date
        }
        allPosts.push(dataObj)
    }
    sortPost(allPosts)
}

// Sorts posts to display most recent first
function sortPost(allPosts) {
    let posts = allPosts;
    let filteredPosts = posts.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1);
    printPosts(filteredPosts)
}

// Prints posts to page
function printPosts(filteredPosts) {
    let posts = filteredPosts;
    let printedPosts = ""
    console.log(filteredPosts)

    for (var i = 0; i < allPosts.length; i++) {
        let indivPost = posts[i]
        console.log(indivPost)
        printedPosts += `<div class="printedPost">
        <p class="post-title">${indivPost.title}<span class="post-date">${indivPost.date}</span></p>
        <p class="post-content">${indivPost.content}</p></div>`;
    }
    document.querySelector('#printed-posts').innerHTML = printedPosts;
}