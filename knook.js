
document.getElementById("submit-post").addEventListener("click", createPost)


// Post object template
function Post(title, body, img, date, author, status) {
    this.title = title;
    this.body = body;
    this.img = img;
    this.date = date;
    this.author = author;
    this.status = status;
}

function createPost() {
    let title= document.getElementById("title")
    let body = document.getElementById("body")

    newPost = new Post(title.value, body.value)

    $.ajax({
        url: 'https://kyle-personal-blog.firebaseio.com/posts.json',
        type: "POST",
        data: JSON.stringify(newPost),
        success: function () {
            console.log("success");
        },
        error: function(error) {
            console.log("error: " + error)
        }
    });
    clearPost(title, body)
    console.log(newPost)
}

function clearPost(title, body) {
    title.value = ""
    body.value = ""
}

function getDate() {
    let dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let date = new Date();

    let dayOfWeek = date.getDay();
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();

    let reviewDay = dayNames[dayOfWeek]
    let reviewMonth = monthNames[month]

    datePosted = reviewDay + " " + reviewMonth + " " + day + ", " + year

    return datePosted;
}

function postDate() {
    getDate()
    
    console.log(datePosted)
}