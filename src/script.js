let cardsGroup = ["🐻", "🐹", "🦊", "🐨", "🐸", "🐭", "🦁", "🐻‍❄️"];
let allCards = cardsGroup.concat(cardsGroup);

function dealCards() {
    table = document.querySelector("#table");

    allCards.forEach(element => {
        let card = document.createElement("div");
        card.innerHTML = 
        "<div class='card'>" +
        "<div class= 'card-content'>" +
        element +
        "</div>" +
        "</div>";
        table.appendChild(card);
    });
}

dealCards();