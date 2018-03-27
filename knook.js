getDate()
getAuthor()
getStatus()
disablePostButton()
selectedText = [];


document.getElementById("submit-post").addEventListener("click", createPost)

document.getElementById("post-body").addEventListener("dblclick", getHighlighted)

// Post object constructor
function Post(author, body, date, status, title) {
    this.author = author;
    this.body = body;
    this.date = date;
    this.status = status;
    this.title = title;
}

// Pushes post to Firebase after published
function createPost() {
    let author = getAuthor(name);
    let body = document.querySelector("#post-body");
    let date = getDate(datePosted);
    let status = "Draft";
    let title = document.querySelector("#title");

    newPost = new Post(author, String(body.outerHTML), date, status, title.value);


    $.ajax({
        url: 'https://kyle-personal-blog.firebaseio.com/posts.json',
        type: "POST",
        data: JSON.stringify(newPost),
        success: function () {
            console.log("success");
        },
        error: function (error) {
            console.log("error: " + error)
        }
    });
    clearPost(title, body)
}

// Clears knook writing area
function clearPost(title, body) {
    title.value = ""
    body.textContent = ""
    disablePostButton();
}

// Disables post if there isn't any content in knook
function disablePostButton() {
    let title = document.getElementById("title").value;
    let body = document.getElementById("post-body").value;

    let button = document.getElementById("submit-post");
    if (title == " ") {
        button.classList.add("disabled");
    }
}

// Gets date
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
    datePosted = reviewMonth + " " + day + ", " + year

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
}

// Collects text that user selected
function getHighlighted() {
    let text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    selectedText.push(text)
    newSpan(text);
    return text;
}

// Wraps selected text in a span
function newSpan(text) {
    let postContent = document.querySelector('#post-body'),
    allText = postContent.innerHTML.split(' '),
    position = allText.indexOf(text);

    let styledText = document.createElement('span');
    styledText.textContent = text;
    styledText.classList.add('header-one');
    console.log(styledText)
    
    allText.splice(position, 1, styledText.outerHTML)
    postContent.innerHTML = allText.join(" ");
 }