
// Adds post information to Firebase
function addPostToDb() {
    let title = document.getElementById("title").value;
    let dbRef = firebase.database().ref().child('text');
    dbRef.on('value', snap => title.innerHTML = snap.val());
    console.log(title)
}

document.getElementById("submit-post").addEventListener("click", addPostToDb)
