var dogUrl = 'https://dog.ceo/api/breeds/image/random'
var catUrl = 'https://api.thecatapi.com/v1/images/search?api_key="8e030fc9-e7ee-47ee-9687-d6df7bee3a67"'
var dogDisplay = $('#dogDisplay');
var dogBtn = $('#dogBtn');
var catDisplay = $('#catDisplay');
var catBtn = $('#catBtn');
var imgBoth = document.getElementsByTagName("img");
var voteInfo = $('#voteInfo');

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

function showInfo() {
    var dogVote = 0;
    var catVote = 0;
    if (dogVote == 10) {
voteInfo.textContent = "Woof Woof! You must be a dog person!"
    } else if (catVote == 10) {
voteInfo.textContent = "Meow! You must be a cat person!"
    }

    }


$('.voteBtn').on('click', function(event){
    console.log(event.target.dataset.vote);
    
    catApi();
    dogApi();
})
