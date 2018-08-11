let canv = document.querySelector('#canv');
let ctx = canv.getContext('2d');
let h = canv.height;
let w = canv.width;
let platformWidth = 70;
let platformHeight = 8;
let platformPosition = (w - platformWidth) / 2;
let leftPress = false;
let rigtPress = false;
let brickRowCount = 7;
let brickColumnCount = 10;
let brickWidth = 40;
let brickHeight = 20;
let brickPadding = 20;
let brickOffsetTop = 20;
let brickOffsetLeft = 55;

let ball = {
    x: w / 2, y: h - 30,
    radius: 8, color: 'green',
    dx: 2, dy: 2
}

    let bricks = [];
    for(c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

document.addEventListener('mousemove', mouseMoveHandler, false);

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canv.offsetLeft;

    if(relativeX > 0 && relativeX < w) {
        platformPosition = relativeX - platformPosition/2;
    }
}

function gameover() {
    ctx.font = '60px Times New Roman';
    ctx.fillStyle='#f24343';
    ctx.strokeStyle='#d63939';
    ctx.fillText( 'GAME OVER' , w/4, h/2);
    ctx.strokeText( 'GAME OVER' , w/4, h/2);
}

function drawBall() {    
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPlatform() {
    ctx.beginPath();
    ctx.rect(platformPosition, h-platformHeight, platformWidth, platformHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collision() {
    for(c=0; c<brickColumnCount; c++) {
    for(r=0; r<brickRowCount; r++) {
        let b = bricks[c][r];
    if(b.status == 1) {
    if(ball.x > b.x && ball.x < b.x+brickWidth && ball.y > b.y && ball.y < b.y+brickHeight) {
       ball.dy = -ball.dy;
     b.status = 0;
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, w, h);
    drawBall();
    drawPlatform(); 
    drawBricks();
    collision();   

    if(ball.x + ball.dx > w-ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }

    if(ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }
    else if(ball.y + ball.dy > h-ball.radius) {
        if(ball.x > platformPosition && ball.x < platformPosition + platformWidth) {
            ball.dy = -ball.dy;
        }
        else {            
			gameover();            
        }
    }
    
    if(rigtPress && platformPosition < h-ball.radius) {
        platformPosition += 7;
    }
    else if(leftPress && platformPosition > 0) {
        platformPosition -= 7;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
}

setInterval(draw, 10);
