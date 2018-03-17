getDate()
getAuthor()
getStatus()
disablePostButton()

document.getElementById("submit-post").addEventListener("click", createPost)


// Post object template
function Post(author, body, date, status, title) {
    this.author = author;
    this.body = body;
    this.date = date;
    this.status = status;
    this.title = title;
}

function createPost() {
    let author = getAuthor(name);
    let body = document.getElementById("body");
    let date = getDate(datePosted);
    let status = "Draft";
    let title = document.getElementById("title");

    newPost = new Post(author, body.value, date, status, title.value);

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
    disablePostButton();
}

function disablePostButton() {
    let title = document.getElementById("title").value;
    let body = document.getElementById("body").value;

    let button = document.getElementById("submit-post");
    if (title === " ") {
        button.classList.add = "disabled";
    }
    else {
        button.removeAttribute("class", "disabled")
    }

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

    postDate(datePosted)

    return datePosted;
}

// Displays author name
function getAuthor() {
    let name = "Kyle Ducharme";
    document.getElementById("author").innerHTML = name
    return name;
}

// Gets status of post
function getStatus() {
    let status = "Draft";
    document.getElementById("status").innerHTML = status

    return status;
}

// Shows date created on the knook area
function postDate(datePosted) {
    let date = datePosted
    document.getElementById("date").innerHTML = date
    console.log(date)
}