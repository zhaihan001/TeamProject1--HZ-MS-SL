var dogUrl = 'https://dog.ceo/api/breeds/image/random'
var catUrl = 'https://api.thecatapi.com/v1/images/search?api_key="8e030fc9-e7ee-47ee-9687-d6df7bee3a67"'
var dogScore = localStorage.getItem("dogScore");
var catScore = localStorage.getItem("catScore");

var dogDisplay = $('#dogDisplay');
var dogBtn = $('#dogBtn');

var catDisplay = $('#catDisplay');
var catBtn = $('#catBtn');

var dogVote = 0;
var catVote = 0;

var messageEl = document.getElementById("messageLine");

function init(){
    document.getElementById("dogScore").innerHTML = localStorage.getItem("dogScore");
    document.getElementById("catScore").innerHTML = localStorage.getItem("catScore");
    dogApi();
    catApi(); 
}

function dogApi() {
    fetch(dogUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            document.getElementById("dogImg").src = data.message;
        })
}

function catApi() {
    fetch(catUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            document.getElementById("catImg").src =  data[0].url;
        })
}

function voteCount(event) {

    var voteItem = event.target.dataset.vote;

    if (voteItem == "dog") {
        dogVote++;
        dogScore++;
        document.getElementById("dogProgress").value = dogVote;
        localStorage.setItem("dogScore",dogScore);
        document.getElementById("dogScore").innerHTML = localStorage.getItem("dogScore");
    }
    else{
        catVote++;
        catScore++;
        document.getElementById("catProgress").value = catVote;
        localStorage.setItem("catScore",catScore);
        document.getElementById("catScore").innerHTML = localStorage.getItem("catScore");

    }

    if (dogVote == 5) {
        messageEl.textContent = "Woof Woof! You must be a dog person!"
    }
    else if (catVote == 5) {
        messageEl.textContent = "Meow! You must be a cat person!"
    }

    if (dogVote == 6 || catVote == 6) {
        messageEl.textContent = ""
        dogVote = 0;
        catVote = 0;
        document.getElementById("dogProgress").value = dogVote;
        document.getElementById("catProgress").value = catVote;
    }
}

init();

$('.voteBtn').on('click', function (event) {
    catApi();
    dogApi();
    voteCount(event);
})

$('#resetBtn').on('click', function () {
    localStorage.clear();
    document.getElementById("dogScore").innerHTML = 0;
    document.getElementById("catScore").innerHTML = 0;
    messageEl.textContent = ""
    dogVote = 0;
    catVote = 0;
    document.getElementById("dogProgress").value = dogVote;
    document.getElementById("catProgress").value = catVote;
    dogScore = 0;
    catScore = 0;
})
