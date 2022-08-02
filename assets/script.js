var dogUrl = 'https://dog.ceo/api/breeds/image/random'
var dogDisplay = $('#dogDisplay');
var dogBtn = $('#dogBtn');
var imgBoth = document.getElementsByTagName("img");
var dogVote = 0;

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
            dogDisplay.append(dogImg);
            console.log(data.message);
        })

}

dogBtn.on('click', dogApi);