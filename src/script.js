let group1 = new Array();
let group2 = new Array();
let timer;
let moves = 0;
let movesTotal = 0;
let numCards = 2;
let startScreen = document.querySelector(".start-screen");
let header = document.querySelector(".default");
let allCards;
let leftCards;
let nextLevelScreen = document.querySelector(".next-level-screen"); 
let timeUp = document.querySelector(".time-is-up");
let movesOver = document.querySelector(".moves-out");
let table = document.querySelector("#table");

//Create cards
function createCards() {
    for (let i = 0; i < numCards; i++) {
        group1[i] = document.createElement("img");
        group1[i].src = `cards/img-${i+1}.png`;
    }
        
    for (let i = 0; i < numCards; i++) {
        group2[i] = document.createElement("img");
        group2[i].src = `cards/img-${i+1}.png`;
    } 
    
    allCards= group1.concat(group2);
}


//shuffle
function shuffleCards() {
    let result = allCards.sort(function() {
        return 0.5 - Math.random(); 
    });
    return result;
}

function start() {
    prepareCards();
    dealCards();
}

function retry() {
    prepareCardsRetry();
    dealCards();
}

function prepareCards(){
    moves = 0;
    movesTotal = movesTotal + 2;
    document.querySelector("#mov-total").innerText = movesTotal;
    createCards();
    numCards++;
}

function prepareCardsRetry(){
    moves = 0;
    movesTotal = movesTotal;
    document.querySelector("#mov-total").innerText = movesTotal;
    createCards();
}

function dealCards() {
    table.style.display = "flex";
    timeUp.style.display = "none";
    movesOver.style.display = "none";
    header.style.display = "block";
    nextLevelScreen.style.display = "none";
    startScreen.style.display = "none";

    startTimer();
    let shuffledCards = shuffleCards();
    table.innerHTML="";

    //Dealing cards to table
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


    //Flip cards when clicking
    function show(){
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
            if(leftCards.length===0 && numCards!==15){
               endLevel();
            } else if (leftCards.length===0 && numCards===15) {
                alert("end");
            }
        }, 2000);
    }


    //compare cards when two open
    function compare(cardsShown){
        let card1 = cardsShown[0].getElementsByTagName('img')[0].src;
        let card2 = cardsShown[1].getElementsByTagName('img')[0].src;

        if(card1 === card2){
            success(cardsShown);
        } else {
            error(cardsShown);
        }
    };


    //It's a match
    function success(cardsShown){
        setTimeout(function(){          
            cardsShown.forEach(function(element) {
                element.classList.add("success");
            });
        }, 800);
    };


    //It's not a match
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


    //
    document.querySelectorAll(".card").forEach(
        function(element){
            element.addEventListener("click", show);
        }
    );

    
}


//Timer
function startTimer(){
    let minutes = 1;
    let seconds = 0;

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

        let totalTime = minutes + seconds;
     
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

        if (totalTime === 0 ) {
           setTimeout(timeOver,1000);
        }
    }

    timer = setInterval(updateTimer, 1000);
}

//Moves counter
 function updateCounter() {
    moves++;
    document.querySelector("#mov").innerText = moves;

    if (moves > movesTotal){
        movesOut();
    }
}

//end game
function endLevel() {
    clearInterval(timer);
    document.querySelector("#mov").innerText = 0;
    nextLevelScreen.style.display = "flex";
    header.style.display = "none";
}

//Time is up
function timeOver() {
    clearInterval(timer);
    document.querySelector("#mov").innerText = 0;
    timeUp.style.display = "flex";
    table.style.display = "none";
    header.style.display = "none";
    movesOver.style.display = "none";

}

//Moves out
function movesOut() {
    clearInterval(timer);
    document.querySelector("#mov").innerText = 0;
    movesOver.style.display = "flex";
    timeUp.style.display = "none";

    table.style.display = "none";
    header.style.display = "none";
}

//Start Game
document.querySelectorAll(".start").forEach(element => {
    element.addEventListener("click", start)
});

document.querySelectorAll(".try-again").forEach(element => {
    element.addEventListener("click", retry)
});