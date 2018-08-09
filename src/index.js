let canv = document.querySelector('#canv');
let ctx = canv.getContext('2d');
let h = canv.height;
let w = canv.width;

drawRects();

function drawRects() {
    let cols = 10;
    let rows = 7;
    let sw = w / cols;
    let sh = (h / cols) / 1.5;
    let pad = sw / 3;

    for (let i = 0; i < rows; i++) {
        for (let k = 0; k < cols; k++) {
            let x = sw * k + pad / 2;
            let y = sh * i + pad / 2;
            ctx.fillRect(x, y, sw - pad, sh - pad);
        }
    }
}

let ball = {
    x: 300, y: 300,
    radius: 10, color: 'green',
    dx: 2, dy: 2
}

drawBall(ball);
function drawBall(ball) {  
    // ctx.clearRect
    ctx.beginPath();    
    ctx.fillStyle = ball.color;
    ctx.moveTo(ball.x, ball.y);
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ball.x += ball.dx;
    ball.y += ball.dy;
    if (ball.x < 500) {
        requestAnimationFrame(
            function() {drawBall(ball);}
        );
    }
}