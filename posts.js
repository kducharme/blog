getData()

function getData() {

    $.ajax({
        url: 'https://kyle-personal-blog.firebaseio.com/posts.json?print=pretty',
        type: "GET",
        success: function (data) {
            console.log('success - data received');
            parseData(data);
        },
        error: function (error) {
            console.table('error: ' + error)
        }
    });
}

function parseData(data) {
    let post = data;
    let keys = Object.keys(post);
    let fullPosts = [];
    
    for (var i = 0; i < keys.length; i++){
        let k =  keys[i]
        let dataObj = {
            k: k,
            title: post[k].title,
            content: post[k].body,
            author: post[k].author,
            date: post[k].date
        }
        fullPosts.push(dataObj)
    }
    sortPost(fullPosts)
}

function sortPost(fullPosts) {
    let posts = fullPosts;
    console.table(posts)
    
    const filteredPosts = posts.sort((a, b) => a.date > b.date ? 1 : -1);
    console.table(filteredPosts)
    // console.log(filteredPosts)
}

function printPosts(){
    let printedPosts = '';

    posts += `<div class="printedPost">
    <p class="post-title">${title}<span class="post-date">${date}</span></p>
    <p class="post-content">${content}</p></div>`;
    
    document.querySelector('#printed-posts').innerHTML = posts + "syccess";
}
