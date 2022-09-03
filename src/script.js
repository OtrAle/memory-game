let group1 = new Array();
let group2 = new Array();
const numCards = 5;

for (let i = 0; i < numCards; i++) {
    group1[i] = document.createElement("img");
    group1[i].src = `cards/img-${i+1}.png`;
}

for (let i = 0; i < numCards; i++) {
    group2[i] = document.createElement("img");
    group2[i].src = `cards/img-${i+1}.png`;
}

let allCards = group1.concat(group2);

function shuffleCards() {
    let result = allCards.sort(function() {
        return 0.5 - Math.random(); 
    });
    return result;
}

function dealCards() {
    let table = document.querySelector("#table");
    let shuffledCards = shuffleCards();
    table.innerHTML="";
    console.log(allCards);

    shuffledCards.forEach(element => {
        let card = document.createElement("div");
        card.classList.add("card");
    
        card.innerHTML = 
        "<div class= 'front'>" +
        "</div>" +
        "<div class='back'>" +
        "</div>";
        table.appendChild(card);
        let front = document.getElementsByClassName("front");
        front[front.length-1].appendChild(element);
    });

    function show(){
        this.classList.add("shown");
    }

    document.querySelectorAll(".card").forEach(
        function(element){
            element.addEventListener("click", show);
        }
    );
}

document.querySelector("button").addEventListener("click", dealCards);