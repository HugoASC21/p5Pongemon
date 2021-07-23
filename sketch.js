 // Hugo - Ball movement
 // Justin - Boxes must not leave screen
 // Aaron - score
 // Rafael - score incrementaition + win state
let state = "title"; // 3 states "title", "game", "win"
let xPos = 350;
let yPos = 200;
let score = 0;
let xSpeed,ySpeed;
let xDirection,yDirection;
let p1score = 0;
let p2score = 0;
let PongemonTitle;

let rect1X = 30; // beginning center coords for rects1 and 2
let rect1Y = 200;
let rect2X = 670;
let rect2Y = 200;
// hitbox for the rectangles
let rect1Top,rect1Right,rect1Bottom;
let rect2Top,rect2Left,rect2Bottom;
let r,g,b;


function preload(){
    PongemonTitle = loadImage("/images/PongemonTitle.png");
}

function setup() {
    createCanvas(700,400);
    background(0);
    rectMode(CENTER);
    xSpeed = random(-5,-6);
    ySpeed = random(-5,-6);
    xDirection = 1;
    yDirection = 1;
}


function draw() {
    if (state == "title") {
        console.log('hi');
        image(PongemonTitle, 0, 0,700,400);
       // PongemonTitle.resize();
    }
    
    else if (state == "game") {
    background(0);
    rectangleMovement();

    fill(r,g,b);
    ellipse(xPos,yPos, 30,30);
    
    xPos += xSpeed * xDirection;
    yPos += ySpeed * yDirection;
    
    if(yPos < 15 || yPos > 385){
        yDirection *= -1;
        r = random(0,255);
        g = random(0,255);
        b = random(0,255);
    }

    if(xPos > 695){
        // player 1 gains a point 
        p1score += 1;
        // reset the ball position and the pad positions
        resetItems();
       
    }
    if (xPos < 15){
        //player 2 gains a point
        p2score += 1
        // reset the ball to original position
        resetItems();
    } 

    textSize(25);
    fill(255);
    text(p1score + " :", 350, 30);
    text(" " + p2score, 380, 30);

    if (p1score == 13){
        console.log("Player1 wins");
        resetItems();
        state = "win";
        
    }
    else if (p2score == 13){
        console.log("Player2 wins");
        resetItems();
        state = "win";
    }
    }
    else {
        // the win screen

        background(255,255,0);
        textSize(30);
        fill(0);

        if (p1score == 13) {
            text("Player 1 has won with " + p1score,180,200);
        }
        if (p2score == 13) {
            text("Player 2 has won with " + p2score,180,200);
        }
    }
}
function mouseClicked() {
    // when the mouse is clicked and checks if the state is on the title screen
    if (state == "title") {
        state = "game";

    } 
}



function rectangleMovement() {
    // drawing rectangle and its movement
    // rect 1 center mode on
    
    // define our hit boxes barriers
    rect1Top = rect1Y - 50;
    rect1Bottom = 50 + rect1Y;
    rect1Right = 7 + rect1X;
    
    rect2Top = rect2Y - 50;
    rect2Bottom = 50 + rect2Y;
    rect2Left = rect2X - 7;

    fill(255);          // 15 wide and 100 tall
    rect(rect1X,rect1Y,15,100);

    // rect 2 center mode on
    fill(255);
    rect(rect2X,rect2Y,15,100);

    if (keyIsDown(87)) {
        // rect 1 moves up
        rect1Y -= 7;
        if (rect1Top < 0) {
            console.log("rect1top",rect1Top)
            rect1Y = 50;
        }
    }
    if (keyIsDown(83)) {
        // rect 1 moves down
        rect1Y += 7;
        if (rect1Bottom > 400) {
            // keep rectangle in screen
            rect1Y = 350;
        }
    }
    // make sure rectangle does not leave boundary
    if (keyIsDown(UP_ARROW)) {
        // rect 2 moves up
        rect2Y -= 7;
        if (rect2Top < 0) {
            rect2Y = 50;
        }
    }
    if (keyIsDown(DOWN_ARROW)) {
        // rect 2 moves down
        rect2Y += 7;
        if (rect2Bottom > 400) {
            rect2Y = 350
        }
    }
    // change direction of ball if collide with rectangles
    if (xPos < rect1Right && yPos > rect1Top + 5 && yPos < rect1Bottom) {
        // if the ball collides against the first rectangle
        xDirection *= -1;
        console.log("Rect 1 collide")
    }
    if (xPos > rect2Left && yPos > rect2Top && yPos < rect2Bottom) {
        // if ball collides against the second rectangle
        xDirection *= -1
        console.log("Rect 2 collide")
    }
}
function resetItems() {
    // this function will just reset the positions of the ball, and the rectangles
    xPos = 350;
    yPos = 200;
    rect1X = 30;
    rect1Y = 200;
    rect2X = 670;
    rect2Y = 200;
}   



    