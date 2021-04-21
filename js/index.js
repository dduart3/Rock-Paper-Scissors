import {gsap} from 'gsap';
import {TextPlugin} from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const $d = document;

const $mainContainer = $d.querySelector(".main-container");
const $gameContainer = $d.querySelector(".game-container");
const $titleParaphs = $d.querySelectorAll(".title p");
const $log = $d.querySelector(".log");
const $logParaphs = $d.querySelectorAll(".log p");
const $options = $d.querySelectorAll(".options .option img");


const $message = $d.querySelector(".message");
const $playerScore = $d.querySelector(".player-score");
const $computerScore = $d.querySelector(".cpu-score");
const $gameFinishedContainer = $d.querySelector(".game-finished-container");
const $restartButton = $d.querySelector(".restart-button");

let playerScore;
let computerScore;



const onAnimationStarted = ()=>{
    gsap.to('#cursor',{text:{value: "|"},duration: 0.5, repeat: -1, ease:"none"});

    const start = (e) =>{
        if(e.key === "Enter"){
            $d.querySelector("#cursor").classList.add("hidden");
            $log.classList.add("hidden");
            $gameContainer.classList.remove("hidden");
            
            initGame();
            
            $d.removeEventListener("keydown", start);
        }
    }

    const keyEvent = $d.addEventListener('keydown', start);
}


const startAnimation = ()=>{
const tl = gsap.timeline({onComplete: onAnimationStarted})
    .from("body", {background: "black", duration: 1, delay: 5})
    .fromTo($titleParaphs[0], {autoAlpha: 0, x:-10}, {autoAlpha: 1, duration: 0.5, repeat: 5, ease: "steps(1)"})

        .to($titleParaphs[0], {text: {value: "DUARTE INDUSTRIES UNIFIED OPERATING SYSTEM"}, duration: 3, ease:"none"})
        .to($titleParaphs[1], {text: {value: "COPYRIGHT 2021 DUARTE INDUSTRIES"}, duration: 3, ease:"none"})
        .to($titleParaphs[2], {text: {value: "-SERVER 1-"}, duration: 1, ease:"none"})
        .to($titleParaphs[3], {text: {value: "ROCK, PAPER, SCISSORS"}, duration: 3, ease: "none"})

        .to($logParaphs[0], {text: {value: "> Initializing Duarte Industries(TM) Boot Agent"}, duration: 3, ease: "none", delay: 1})
        .to($logParaphs[1], {text: {value: "> Loading game files"}, duration: 3, ease: "none", delay: 2})
        .to($logParaphs[2], {text: {value: "> Checking game files integrity"}, duration: 3, ease: "none", delay: 2})
        .to($logParaphs[3], {text: {value: "> System ready! Press Enter to start the game"}, duration: 3, ease: "none", delay: 2})
}



const computerPlay = ()=>{
    const computerOptions = ["rock", "paper", "scissors"];
    return computerOptions[Math.floor(Math.random()*computerOptions.length)];
}

const playerPlay = (e) =>{
    let playerSelection;
        
    if (e.target === $options[0]) { playerSelection = "rock"; }

    else if (e.target === $options[1]) { playerSelection = "paper"; }

    else if (e.target === $options[2]) { playerSelection = "scissors"; }

    return playerSelection;
}


const displayMessage = (result, playerSelection, computerSelection) =>{
    const winMessages = ["Nice one!", "Yeahhh", "Woah, you're really good", "Keep going!", "What a beast!"];
    const lossMessages = ["Oh no", "Well, at least you tried", "Ooof, that's gonna hurt", "Nope, it didn't worked", "Try to get a doctor after this"];
 
    if (result === "tie") {
        gsap.to(".message", {text: {value: "Round Draw"}});
    }
    else if(result === "win"){
        gsap.to(".message", {text: {value: `${winMessages[Math.floor(Math.random()*winMessages.length)]}, ${playerSelection} beats ${computerSelection}`}});
    }else{
        gsap.to(".message", {text: {value: `${lossMessages[Math.floor(Math.random()*lossMessages.length)]}, ${computerSelection} beats ${playerSelection}`}});
    }
 
 }


const playRound = (playerSelection, computerSelection) =>{
    if(playerSelection === computerSelection){
        
        displayMessage("tie");

    }
    else if(playerSelection === "rock" && computerSelection === "scissors" || playerSelection === "paper" && computerSelection ==="rock" || playerSelection === "scissors" && computerSelection ==="paper"){
        
        playerScore++;
        $playerScore.innerHTML = `PLAYER: ${playerScore}`;

        displayMessage("win", playerSelection, computerSelection);
        
    }else{
        
        computerScore++;
        $computerScore.innerHTML = `COMPUTER: ${computerScore}`;

        displayMessage("loss", playerSelection, computerSelection);
    }
}


const finishGame = (result) =>{

    $d.removeEventListener("click", playGame);
    
    $mainContainer.classList.add("hidden");

    const finishAnimation = gsap.to("body",{background: "black", duration: 2, onReverseComplete: ()=>{  
        $mainContainer.classList.remove("hidden");
    }});

       
    const finishAnimation2 = gsap.to(".game-finished-paraph", {text: {value: result}, duration: 2, ease:"none",delay: 5, onComplete: ()=>{       
        $gameFinishedContainer.classList.remove("invisible");
          
        gsap.fromTo(".restart-button", {autoAlpha: 0}, {autoAlpha: 1, duration:5});

        $restartButton.addEventListener("click", ()=>{
                finishAnimation.reverse();
                initGame();
            })
        }
    });
}

const playGame = (e)=>{
    let playerSelection = playerPlay(e);
    let computerSelection = computerPlay();

    if(playerSelection){
        playRound(playerSelection, computerSelection);
    }

  if(playerScore >= 5 || computerScore >= 5){
      finishGame((playerScore > computerScore) ? "YOU HAVE WON" : "YOU HAVE LOST");
  }
}


const initGame = () =>{
    playerScore = 0;
    computerScore = 0;
    
    $message.innerHTML = "GOOD LUCK!";
    $playerScore.innerHTML = `PLAYER: ${playerScore}`;
    $computerScore.innerHTML = `COMPUTER: ${computerScore}`;

   
    $gameFinishedContainer.classList.add("invisible");
   

    $d.addEventListener("click", playGame);
}



startAnimation();

