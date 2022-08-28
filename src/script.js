let cardsGroup = ["🐻", "🐹", "🦊", "🐨", "🐸", "🐭", "🦁", "🐻‍❄️"];
let allCards = cardsGroup.concat(cardsGroup);

function shuffleCards() {
    let result = allCards.sort(function() {
        return 0.5 - Math.random(); 
    });
    return result;
}

function dealCards() {
    table = document.querySelector("#table");
    let shuffledCards = shuffleCards();

    shuffledCards.forEach(element => {
        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = 
        "<div class= 'front'>" +
        element +
        "</div>" +
        "<div class='back'>" +
        "</div>";
        table.appendChild(card);
    });

    function show(){
        this.classList.add("shown")
    }

    document.querySelectorAll(".card").forEach(
        function(element){
            element.addEventListener("click", show);
        }
    );
}

document.querySelector("button").addEventListener("click", dealCards);