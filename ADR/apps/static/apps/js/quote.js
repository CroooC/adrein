//variable pour recuperer depuis html id nom
let btn = document.getElementById('btn');
let avatar = document.getElementById('avatar');
let citation = document.getElementById('citation');
let text = document.getElementById('nom');
let citations = [];
var staticUrl = window.staticUrl;

//recuperer les citations depuis .json
fetch(citUrl)
    .then(response => response.json())
    .then(data => {
        citations = data;
    });

function updatePage() {
    //choix hasard de citations
    let random = Math.floor(Math.random() * (citations.length - 0));
    let randomCitation = citations[random];
    const { nom, citation: quote, image } = randomCitation;

    text.innerText = nom;
    citation.innerText = quote;
    let imageName = image.split('/').pop();
    avatar.src = `${staticUrl }apps/img/${imageName}`;
}

btn.addEventListener('click', updatePage);
