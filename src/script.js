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


let startScreen = document.querySelector(".start-screen");
let header = document.querySelector(".default");


function dealCards() {
    header.style.display = "flex";
    let moves = 0;
    let table = document.querySelector("#table");
    let shuffledCards = shuffleCards();
    table.innerHTML="";

    shuffledCards.forEach(element => {
        let cardBack = document.createElement("img");
        cardBack.src = "card-back.png";

        let card = document.createElement("div");
        card.classList.add("card");
    
        card.innerHTML = 
        "<div class= 'front'>" +
        "</div>" +
        "<div class='back'>" +
        "</div>";
        table.appendChild(card);

        let back = document.getElementsByClassName("back");
        back[back.length-1].appendChild(cardBack);  
        
        let front = document.getElementsByClassName("front");
        front[front.length-1].appendChild(element);    
    });

    function show(){
        let leftCards;
         let allShown = document.querySelectorAll(".shown:not(.success)");
        if(allShown.length > 1){
            return;
        }
        this.classList.add("shown");
        
        let cardsShown = document.querySelectorAll(".shown:not(.success)");
        if (cardsShown.length < 2){
            return;
        }
        compare(cardsShown);
        updateCounter();

        setTimeout(function() {
            leftCards = document.querySelectorAll(".card:not(.success)");
            if(leftCards.length===0){
               end();
            }
        }, 2000);
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
        setTimeout(function(){          
            cardsShown.forEach(function(element) {
                element.classList.add("success");
            });
        }, 800);
    };

    function error(cardsShown){
       setTimeout(function(){          
            cardsShown.forEach(function(element) {
                element.classList.add("error");
            });
        }, 500);
     
        setTimeout(function(){          
            cardsShown.forEach(function(element) {
                element.classList.remove("error");
                element.classList.remove("shown");
            });
        }, 1200);
    };

    document.querySelectorAll(".card").forEach(
        function(element){
            element.addEventListener("click", show);
        }
    );

    startScreen.style.display = "none";

    

}

document.querySelector(".start").addEventListener("click", dealCards);

//Timer
function startTimer(){
    let seconds = 0;
    let minutes = 1;
    let textSeconds;
    let textMinutes;
 
    function updateTimer(){
        seconds--;
        if (seconds < 0){
            seconds = 59;
            minutes--;
        }
        if (minutes < 0){
            seconds = 0;
            minutes = 0;
            clearInterval(timer);
        }

        textSeconds = seconds;
        textMinutes = minutes;

        if (seconds < 10){
            textSeconds = `0${seconds}`
        } 
        if (minutes < 10) {
            textMinutes = `0${minutes}`
        }

        document.querySelector("#minutes").innerHTML= textMinutes;
        document.querySelector("#seconds").innerHTML= textSeconds;
    }
    let timer = setInterval(updateTimer, 1000);
}

startTimer();

//Moves counter
let moves = 0;
 function updateCounter() {
    moves++;
    document.querySelector("#mov").innerText = moves;
}

//end game

function end() {
    header.style.display = "none";
    startScreen.style.display = "flex";
 }
