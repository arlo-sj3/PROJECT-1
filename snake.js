$(document).ready(function() {
    //hi-score  null bug fixed
    highScore0();
    // keysOn();

    //scores
    $('#score').html('SCORE: ' + score);
    $('#hiscore').html('HI-SCORE: ' + localStorage.getItem('HI-SCORE: '));

    //songs
    $('#song1').on('click', function(event) {
        song1.toggle();
    })
    $('#song2').on('click', function(event) {
        song2.toggle();
    })
    $('#song3').on('click', function(event) {
        song3.toggle();
    })
    $('#song4').on('click', function(event) {
        song4.toggle();
    })

    //difficulties
    $('#diff1').on('click', function() {
        window.clearInterval(int);
        int = setInterval(gameLoop, 300)
    })
    $('#diff2').on('click', function() {
        window.clearInterval(int);
        int = setInterval(gameLoop, 100)
    })
    $('#diff3').on('click', function() {
        window.clearInterval(int);
        int = setInterval(gameLoop, 50)
    })
    $('#diff4').on('click', function() {
        window.clearInterval(int);
        int = setInterval(gameLoop, 25)
    })

    //restart button
    $('#restart').on('click', function() {
        restart();
        $('#restart').css('display','none');
    })

    //True False buttons
    $('.trueFalse').on('click', function(event){
      var guess = event.target.id
      var answer = $('#funfact').data().answer;
    if(guess == answer){
      $('.modal').css('display','none');
      // running = true;
      setTimeout(function(){
        modalLoading = false;
        running = true;
      },1000);
      score += 10;
    }else{
      $('.modal').css('display','none');
      // running = true;
      setTimeout(function(){
        modalLoading = false;
        running = true;
      },1000);

    }
    })

    //timeout for resume


});

//song play-pause
Audio.prototype.toggle = function() {
    if (this.playing) {
        this.pause();
        this.playing = false;
    } else {
        this.play();
        this.playing = true;
    }
}

// settings
var snake1 = 20;
var snake2 = 38;
var height = 40;
var width = 76;
var interval = 9999;
var increment = 5;
var playing = false
var modalLoading = false

// game vars
var length = 0;
var tail1 = [snake1];
var tail2 = [snake2];
var fK;
var fI;
var running = false;
var gameOver = false;
var direction; //up = 1, down = 2, left  = 0, right = -1.
var int;
var score = 0;
var hiscore = localStorage.getItem('HI-SCORE: ');
var funfact = ''

//Audio files
var song1 = new Audio('Harmony (Old Music).mp3');
var song2 = new Audio('Medieval (Old Music).mp3');
var song3 = new Audio('Sea Shanty (Old Music) (1).mp3');
var song4 = new Audio('Black Sabbath - War Pigs.mp3')
var se1 = new Audio('burning.mp3')
var se2 = new Audio('gameover.mp3')

//starting point
function run() {
    init();
    int = setInterval(gameLoop, interval);
}

function init() {
    createMap();
    createSnake();
    createFood();
}

function restart() {
    if (gameOver) {
        $('#board').empty();
        resetvars();
        init();
    }
}

//For play and pause
function gameLoop() {
    if (running && !gameOver) {


      // if($('.modal').css('display') === 'block'){
      //   running === false
      // }
        update();
    } else if (gameOver) {
        clearInterval(int);
        $('#restart').css('display','block');
    }
}

//Creation functions
function createMap() {
    let table = $('table');
    for (var k = 0; k < height; k++) {
        let row = $('<tr></tr>');
        for (var i = 0; i < width; i++) {
            if (k === 0 || k === height - 1 || i === 0 || i === width - 1) {
                row.append("<td class = 'wall' id = '" + k + "-" + i + "'></td>");
            } else {
                row.append("<td class = 'blank' id = '" + k + "-" + i + "'></td>");
            }
            $(table).append(row);
        }
    }
}

function createSnake() {
    set(snake1, snake2, 'snake');
}

function createFood() {
    var found = false;
    while (!found && (length < (width - 2) * (height - 2) + 1)) {

        var foodK = rand(1, height - 1);
        var foodI = rand(1, width - 1);
        if (getType(foodK, foodI) === 'blank')
            found = true;

    }
    set(foodK, foodI, 'food');
    fK = foodK;
    fI = foodI;
}

//Get&Set functions
function get(k, i) {
    return document.getElementById(k + '-' + i)
}

function set(k, i, value) {
    if (k != null && i != null)
        get(k, i).setAttribute('class', value);
}

function getType(k, i) {
    return get(k, i).getAttribute('class');
}

//Random generators
function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomint(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Game controls
window.addEventListener("keydown", function key(event) {
  event.preventDefault();
    var key = event.keyCode;
    //for UP
    if (direction != 2 && key === 38)  {
        direction = 1;
    }
    // for DOWN
    else if (direction != 1 && key === 40) {
        direction = 2;
    }
    //for LEFT
    else if (direction != -1 && key === 37) {
        direction = 0;
    }
    //for RIGHT
    else if (direction != 0 && key === 39) {
        direction = -1;
    }

//starts on a keydown
    if (!running && !modalLoading)
        running = true;
    else if (key === 32)
        running = false;
});

//to display instructions when paused
function overB(){
  if(running === true){
     $('.overBoard').css('display','none')
  }
}


//for moving the snake
function update() {
  overB();
    set(fK, fI, 'food');
    updateTail();
    set(tail1[length], tail2[length], 'blank');
    if (direction === 0) {
        snake2--;
    } else if (direction === -1) {
        snake2++;
    } else if (direction === 1) {
        snake1--;
    } else if (direction === 2) {
        snake1++;
    }
    //Game over conditions below
    set(snake1, snake2, 'snake');
    for (var i = tail1.length - 1; i >= 0; i--) {
        if (snake1 === tail1[i] && snake2 === tail2[i]) {
            gameOver = true;
            alrt();
            break;
        }
    }
    if (snake1 === 0 || snake1 === height - 1 || snake2 === 0 || snake2 === width - 1)
        gameOver = true;
    alrt();
    if (snake1 == fK && snake2 == fI) {
        se1.play();
        score += 1;
        createFood();
        running = false;
        length += increment;
        running = true;
        if (score === 1 || score % 7 === 0) {
          running = false;
          modalLoading = true;

https://opentdb.com/api.php?amount=50&category=9&difficulty=easy

          // disable();
             $.get('https://opentdb.com/api.php?amount=50&category=9&difficulty=easy', function(data) {
               $('.modal').css('display','block');



            var onlyTrue = trueFalse(data)
            console.log(onlyTrue)
            var num = getRandomint(0,13)
                funfact = onlyTrue[num].question
                $('#funfact').html('QUESTION: '+ funfact);
                $('#funfact').data('answer',onlyTrue[num].correct_answer);

//https://opentdb.com/api.php?amount=10&type=boolean
            })
        }
    }

    $('#score').html('SCORE: ' + score);
    $('#hiscore').html('HI-SCORE: ' + localStorage.getItem('HI-SCORE: '));
}

//sifting through trivia
function trueFalse(data){
  var bool = [];
  for(i = 0; i < data.results.length; i++){
  if (data.results[i].type === "boolean"){
    bool.push(data.results[i])
  }
}
  return bool
}

//for moving snake tail
function updateTail() {
    for (var i = length; i > 0; i--) {
        tail1[i] = tail1[i - 1];
        tail2[i] = tail2[i - 1];
    }
    tail1[0] = snake1;
    tail2[0] = snake2;
}

//sets new high score
function alrt() {
    if (gameOver === true) {
        se2.play();
        // alert('GAME OVER! Refresh the page to play again.')
        if (score > localStorage.getItem('HI-SCORE: ')){
          localStorage.setItem('HI-SCORE: ', score);
        }
    }
}

//for initial hi-score 0
function highScore0() {
    if (localStorage.getItem('HI-SCORE: ') === null || localStorage.getItem('HI-SCORE: ') === undefined) {
        localStorage.setItem('HI-SCORE: ', 0)
      }else if (score > localStorage.getItem('HI-SCORE: ')){
        localStorage.setItem('HI-SCORE: ', score);

      }

    $('#hiscore').html('HI-SCORE: ' + localStorage.getItem('HI-SCORE: '));
}
//disable keys for modal
// function disable(){
//   if($('.modal').css('display')==='block')
//   {
//     var key = event.keyCode;
//     window.removeEventListener("keydown", function key(event){
//
//     }
//     console.log('something')
//
//   //   document.onkeydown = function(){
//   //
//   //     return false;
//   //   }
//   }
// }


 // function hiderestart(){
 //   if(gameOver === false){
 //     $('#restart').css('display','none');
 //   }
 // }
//run game!
run();


//resets global vars for new game without refreshing
function resetvars() {
    snake1 = 20;
    snake2 = 38;
    height = 40;
    width = 76;
    interval = 100;
    increment = 5;
    playing = false;
    modalLoading = false

    // game vars
    length = 0;
    tail1 = [snake1];
    tail2 = [snake2];
    fK;
    fI;
    running = false;
    gameOver = false;
    direction; //up = 1, down = 2, left  = 0, right = -1.
    int;
    score = 0;
    hiscore = localStorage.getItem('HI-SCORE: ');

}

// 'https://g-spoon.herokuapp.com/food/trivia/random'
