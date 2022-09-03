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
         let allShown = document.querySelectorAll(".shown:not(.success)");
        if(allShown.length > 1){
            return;
        }
        this.classList.add("shown");
        
        let cardsShown = document.querySelectorAll(".shown");
        if (cardsShown.length < 2){
            return;
        }
        compare(cardsShown);
    }

    function compare(cardsShown){
        let card1 = cardsShown[0].getElementsByTagName('img')[0].src;
        let card2 = cardsShown[1].getElementsByTagName('img')[0].src;

        if(card1 === card2){
            success(cardsShown);
        } else {
            error(cardsShown);
        }
    };

    function success(cardsShown){
        cardsShown.forEach(function(element) {
            element.classList.add("success");
        });    
    };

    function error(cardsShown){
        cardsShown.forEach(function(element) {
            element.classList.add("error");
        });     

        setTimeout(function(){          
            cardsShown.forEach(function(element) {
                element.classList.remove("error");
                element.classList.remove("shown");
            });
        }, 1000);
    };

    document.querySelectorAll(".card").forEach(
        function(element){
            element.addEventListener("click", show);
        }
    );
}

document.querySelector("button").addEventListener("click", dealCards);