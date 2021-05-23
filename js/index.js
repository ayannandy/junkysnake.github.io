//game constants and veriable
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameoverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed =10;
let score = 0;
let lastPaintTime = 0
let snakeArr = [
    { x: 13, y: 15 }
]

let food = { x: 6, y: 7 };

//game function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    // console.log(ctime);
}

function gameEngine() {
    
    //Part 1 : Updating the  snake arrey and food

    if (isCollide(snakeArr)) {
        gameoverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("game over Press any key for play again");
        snakeArr = [{ x: 13, y: 15 }];
        //music is pause  untill full devlopement
        musicSound.play();
        score = 0;
        scoreBox.innerHTML = "score: " + score;
    }
    // if you have eaten the food then increase the food and regenrate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore:" + hiscoreval;
        }
        scoreBox.innerHTML = "score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });

        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
    //moving the snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = { ...snakeArr[i] };


    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    function isCollide(snake) {
        //if you bum into your self
        for (let i = 1; i < snakeArr.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                return true;
            }
        }
        //if you bump into the wall 
        if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
            return true;
        }


    }


    //Part 2 : Display the snake and food 



    // Display the snake

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}




//main logic start here

let highscore = localStorage.getItem("hiscore");
hiscoreval = 0;
if (highscore === null) {
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(highscore);
    hiscoreBox.innerHTML = "HiScore:" + highscore;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } // start game
    musicSound.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;


        default:
            break;
    }
});