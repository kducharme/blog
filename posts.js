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
    let posts = '';

    for (var i = 0; i < keys.length; i++){
        let k = keys[i];
        let title= post[k].title;
        let content = post[k].body;
        let author = post[k].author;
        let date = post[k].date;
        posts += `${title} ${content}`;
    }
    document.querySelector('#printed-posts').textContent = posts;
}