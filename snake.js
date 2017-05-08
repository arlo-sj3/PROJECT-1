$(document).ready(function() {
    // $.get('https://g-spoon.herokuapp.com/food/trivia/random', function(data) {
    //     console.log(data)
    // })
});

// settings
var snake1 = 23;
var snake2 = 35;
var height = 46;
var width = 70;
var interval = 100;
var increment = 1;

// game vars
var length = 0;
var tail1 = [snake1];
var tail2 = [snake2];
var fK;
var fI;
var running = false;
var gameOver = false;
var direction = -1; //up = 0, down = -1, left  = 1, right = 2.
var int;

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


function createMap() {
    let table = $('table');
    // table.append('<p>hello</p>');
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
    console.log(table)
}

function createSnake() {
    set(snake1, snake2, 'snake');
}

function get(k, i) {
    return document.getElementById(k + '-' + i)
}

function set(k, i, value) {
    if (k != null && i != null)
        get(k, i).setAttribute('class', value);
}

function rand(min, max) {
    // console.log()
    return Math.floor(Math.random() * (max - min) + min);
}

function getType(k, i) {
    return get(k, i).getAttribute('class');
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

window.addEventListener("keydown", function key(event) {
    var key = event.keyCode;
    //for UP
    console.log(event.keyCode)
    if (direction != 2 && key === 38){
      direction = 1;
    }
    // for DOWN
     else if (key === 40){
      direction = 2;
    }
    //for LEFT
     else if ((key === 37 )){
      direction = 0;
    }
    //for RIGHT
    else if (key === 39){
      direction = -1;
    }

    if (!running)
        running = true;
    else if (key === 32)
        running = false;
});

function gameLoop() {
    if (running && !gameOver) {
        update();
    } else if (gameOver) {
        clearInterval(int);
    }
}

function update() {
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
    set(snake1, snake2, 'snake');
}

function updateTail() {
    for (var i = length; i > 0; i--) {
        tail1[i] = tail1[i - 1];
        tail2[i] = tail2[i - 1];
    }
    tail1[0] = snake1;
    tail2[0] = snake2;
}

run();
