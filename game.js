// Variables
let buttonColors = ["red", "blue" , "green", "yellow"]; 
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// Document
$(document).keypress(function(){
    if(!started){
        started = true;
        nextSequence();
    }
});

$('.btn').click(function() {
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

// Functions
function nextSequence() {
    level++;
    $('#level-title').text(`Level ${level}`)
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Animation
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);

    // Sound
    playSound(randomChosenColor);
}

function playSound(name){
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function() {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

function checkAnswer (currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound("wrong");

        $(document.body).addClass("game-over");
        setTimeout(function() {
            $(document.body).removeClass("game-over");
        }, 200);

        $('#level-title').text("Game Over, Press Any Key to Restart")
        startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}