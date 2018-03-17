createPost()

function createPost() {

    $.ajax({
        url: 'https://kyle-personal-blog.firebaseio.com/posts.json?print=pretty',
        type: "GET",
        success: function (data) {
            console.log("data", data);
        },
        error: function (error) {
            console.log("error: " + error)
        }
    });

    console.log(data.author)
}

// function printPost() {
//     let printedPost = ""
//     printedPost += `<div class = "individual-post">
//     <p class = "${Post.author}"></p>
//     `
//     document.getElementById("printed-posts") = printedPost
// }