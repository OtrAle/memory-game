let cardsGroup = ["🐻", "🐹", "🦊", "🐨", "🐸", "🐭", "🦁", "🐻‍❄️"];
let allCards = cardsGroup.concat(cardsGroup);

function dealCards() {
    table = document.querySelector("#table");

    allCards.forEach(element => {
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
}

function show(){
    this.classList.add("shown")
}

dealCards();

document.querySelectorAll(".card").forEach(
    function(element){
        element.addEventListener("click", show);
    }
);