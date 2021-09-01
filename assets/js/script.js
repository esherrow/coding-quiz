var questions=[
    {
        question:"What CSS declaration could you add to a 50%-width < div > to center it?",
        responseA:{
            correct: false,
            text:"text-align: center"
        },
        responseB:{
            correct:true,
            text:"margin: 0 auto"
        },
        responseC:{
            correct:false,
            text:"float: center"
        },
        responseD:{
            correct:false,
            text:"align: center"
        }
    },
    {
        question:"Which CSS property allows the parent element to display its CSS properties by stretching its dimensions to physically contain its child elements?",
        responseA:{
            correct:false,
            text:"text-align: center;"
        },
        responseB:{
            correct:true,
            text:"overflow: auto;"
        },
        responseC:{
            correct:false,
            text:"margin: auto;"
        },
        responseD:{
            correct:false,
            text:"display: inline-block;"
        }
    },
    {
        question:"Which statement correctly stores data into the Web Storage API?",
        responseA:{
            correct:true,
            text:"localStorage.setItem('lunch', 'sandwich');"
        },
        responseB:{
            correct:false,
            text:"localStorage.getItem('lunch', 'sandwich'));"
        },
        responseC:{
            correct:false,
            text:"getItem.localStorage.('lunch', 'sandwich'));"
        },
        responseD:{
            correct:false,
            text:"setItem.localStorage('lunch', 'sandwich'));"
        }
    },
    {
        question:"The browser event submit allows us to do the following:",
        responseA:{
            correct:false,
            text:"Submit a form using a button."
        },
        responseB:{
            correct:false,
            text:"Submit a form using the Enter key."
        },
        responseC:{
            correct:true,
            text:"Submit a form using both a button and the Enter key."
        },
        responseD:{
            correct:false,
            text:"Submit a form using a different method"
        }
    },
    {
        question:"Which of the following is NOT a reason to validate a user's responses?",
        responseA:{
            correct:false,
            text:"Offers the user an opportunity to enter a correct response"
        },
        responseB:{
            correct:false,
            text:"Reduces bogus answers getting stored in the database."
        },
        responseC:{
            correct:true,
            text:"Improves the user experience."
        },
        responseD:{
            correct:false,
            text:"Increases the overall quality of the user data."
        }
    }
]

var highscore = [];

timeRemaining = 100;

time = document.querySelector("#time");
title =document.querySelector(".title");
start =document.querySelector("#start");

questionList =document.querySelector("#questionList");
question=document.querySelector("#question");

responseA=document.querySelector("#responseA");
responseB=document.querySelector("#responseB");
responseC=document.querySelector("#responseC");
responseD=document.querySelector("#responseD");

score=document.querySelector("#score");
winnerName=document.querySelector("#winnerName");
submit=document.querySelector("#submit");
winnerList=document.querySelector("#winnerList");

function questionLayout(){
    responseA.innerHTML = questions[0].responseA.text;
    responseB.innerHTML = questions[0].responseB.text;
    responseC.innerHTML = questions[0].responseC.text;
    responseD.innerHTML = questions[0].responseD.text;
    question.innerHTML = questions[0].question;
}

function openingScene(){
    questionLayout();
    questionList.setAttribute("class", "inGame");

    start.addEventListener("click", function(evt){
        evt.stopPropagation();
        startGame();
    })
}

function startGame(){
    questionList.removeAttribute("class","inGame");

    var timerInterval = setInterval(function(){
        timeRemaining--;
        time.innerHTML="Time Remaining: "+timeRemaining;
        if(timeRemaining == 0){
            clearInterval(timerInterval);
            gameFinished();
        }
    }, 1000);
    var i=0;
    function nextQuestion(i){
        if(i<questions.length){
            responseA.innerHTML = questions[i].responseA.text;
            responseB.innerHTML = questions[i].responseB.text;
            responseC.innerHTML = questions[i].responseC.text;
            responseD.innerHTML = questions[i].responseD.text;
            question.innerHTML = questions[i].question;
        }else{
            clearInterval(timerInterval);
            gameFinished();
        }
    }
    responseA.addEventListener("click", function(evt){
        evt.stopPropagation();
        if(questions[i].responseA.correct == true){
            i++;
            nextQuestion(i);
        }else{
            timeRemaining = timeRemaining-10;
            i++;
            nextQuestion(i);
        }
    });
    responseB.addEventListener("click", function(evt){
        evt.stopPropagation();
        if(questions[i].responseB.correct == true){
            i++;
            nextQuestion(i);
        }else{
            timeRemaining = timeRemaining-10;
            i++;
            nextQuestion(i);
        }
    });
    responseC.addEventListener("click", function(evt){
        evt.stopPropagation();
        if(questions[i].responseC.correct == true){
            i++;
            nextQuestion(i);
        }else{
            timeRemaining = timeRemaining-10;
            i++;
            nextQuestion(i);
        }
    });
    responseD.addEventListener("click", function(evt){
        evt.stopPropagation();
        if(questions[i].responseD.correct == true){
            i++;
            nextQuestion(i);
        }else{
            timeRemaining = timeRemaining-10;
            i++;
            nextQuestion(i);
        }
    });
};


function rankScore(highscore){
    highscore = highscore.sort(function(x,y){return x.score - y.score});
    highscore = highscore.reverse();
    return highscore;
}
function getPastScores(highscore){
    if(localStorage.getItem("highscore") === null){
        return highscore;
    }else {
        return JSON.parse(localStorage.getItem("highscore"));
    }
}
function printScore(highscore, winnerList){
    for(i=0; i<highscore.length; i++){
        var currentPlayer = highscore[i];
        var entry = document.createElement("li");

        entry.textContent = "PLAYER: "+currentPlayer.name+" SCORE: "+currentPlayer.score;
        winnerList.appendChild(entry);
    }
}

function gameFinished(){
    highscore=getPastScores(highscore);
    time=timeRemaining;

    questionList.setAttribute("class","inGame");
    title.setAttribute("class","inGame");
    winnerName.removeAttribute("class","inGame");

    submit.addEventListener("click", function(){
        winnerName.setAttribute("class","inGame");
        submit.setAttribute("class","inGame");

        var playerName = winnerName.value;
        var player={
            name: playerName,
            score: timeRemaining
        }
        highscore.push(player);
        rankScore(highscore);
        printScore(highscore, winnerList);
        localStorage.setItem("highscore", JSON.stringify(highscore));
    })
}

openingScene();