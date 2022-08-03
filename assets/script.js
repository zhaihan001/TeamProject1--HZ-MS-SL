var dogUrl = 'https://dog.ceo/api/breeds/image/random'
var catUrl = 'https://api.thecatapi.com/v1/images/search?api_key="8e030fc9-e7ee-47ee-9687-d6df7bee3a67"'
var dogDisplay = $('#dogDisplay');
var dogBtn = $('#dogBtn');
var catDisplay = $('#catDisplay');
var catBtn = $('#catBtn');
var imgBoth = document.getElementsByTagName("img");

var dogVote = 0;
var catVote = 0;
var dogScore = 1;
var catScore = 1;
var messageEl = document.getElementById("messageLine");


function clear() {
    for (let i = 0; i < imgBoth.length; i++) {
        imgBoth[i].remove();
    }
}

function dogApi() {
    clear();
    fetch(dogUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var dogImg = document.createElement('img');
            dogImg.src = data.message;
            dogDisplay.prepend(dogImg);
            console.log(data);
            console.log(data.message);
        })
}

function catApi() {
    clear();
    fetch(catUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var catImg = document.createElement('img');
            catImg.src = data[0].url;
            catDisplay.prepend(catImg);
            console.log(data);
        })
}

function voteCount() {

    var voteItem = event.target.dataset.vote;
    console.log(voteItem);

    if (voteItem == "dog") {
        dogVote++;
        document.getElementById("dogProgress").value = dogVote;
        localStorage.setItem("dogScore",dogScore++);
        document.getElementById("dogScore").innerHTML = localStorage.getItem("dogScore");
    }
    else {
        catVote++;
        document.getElementById("catProgress").value = catVote;
        localStorage.setItem("catScore",catScore++);
        document.getElementById("catScore").innerHTML = localStorage.getItem("catScore");

    }

    if (dogVote == 2) {
        messageEl.textContent = "Woof Woof! You must be a dog person!"
    }
    else if (catVote == 2) {
        messageEl.textContent = "Meow! You must be a cat person!"
    }

    if (dogVote == 3 || catVote == 3) {
        messageEl.textContent = ""
        dogVote = 0;
        catVote = 0;
        document.getElementById("dogProgress").value = dogVote;
        document.getElementById("catProgress").value = catVote;
    }
}

$('.voteBtn').on('click', function (event) {
    catApi();
    dogApi();
    voteCount();
})

$('#resetBtn').on('click', function () {
    localStorage.clear();
    document.getElementById("dogScore").innerHTML = "";
    document.getElementById("catScore").innerHTML = "";
    messageEl.textContent = ""
    dogVote = 0;
    catVote = 0;
    document.getElementById("dogProgress").value = dogVote;
    document.getElementById("catProgress").value = catVote;
    dogScore = 1;
    catScore = 1;
})
