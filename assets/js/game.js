$(document).ready(function () {
    // define score
    var score = 0;
    // set lives
    var lives = 3;
    // store canvas element selector
    var canvas = $('#myCanvas');
    // store 2D rendering context
    var ctx = canvas[0].getContext('2d');
    var x = canvas.width() / 2;
    // console.log(x);
    var y = canvas.height() - 30;
    // console.log(y);
    var dx = 2;
    // console.log(dx);
    var dy = -2;
    // console.log(dy);
    var ballRadius = 10;
    // define paddle
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width() - paddleWidth) / 2;
    // key press
    var rightPressed = false;
    var leftPressed = false;
    // block details
    var blockRowCount = 3;
    var blockColumnCount = 5;
    var blockWidth = 75;
    var blockHeight = 20;
    var blockPadding = 10;
    var blockOffsetTop = 30;
    var blockOffsetLeft = 30;
    // blocks array
    var blocks = [];
    // loop through blocks array
    for (c = 0; c < blockColumnCount; c++) {
        blocks[c] = [];
        for (r = 0; r < blockRowCount; r++) {
            blocks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
    // run function on key 
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    function keyDownHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = true;
        }
        else if (e.keyCode == 37) {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = false;
        }
        else if (e.keyCode == 37) {
            leftPressed = false;
        }
    }

    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }

    function collisionDetection() {
        for (var c = 0; c < blockColumnCount; c++) {
            for (var r = 0; r < blockRowCount; r++) {
                var b = blocks[c][r];
                if (b.status == 1) {
                    if (x > b.x && x < b.x + blockWidth && y > b.y && y < b.y + blockHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if (score == blockRowCount * blockColumnCount) {
                            alert("YOU WIN!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + score, 8, 20);
    }

    function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    };

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height() - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawBricks() {
        for (var c = 0; c < blockColumnCount; c++) {
            for (var r = 0; r < blockRowCount; r++) {
                if (blocks[c][r].status == 1) {
                    var blockX = (c * (blockWidth + blockPadding)) + blockOffsetLeft;
                    var blockY = (r * (blockHeight + blockPadding)) + blockOffsetTop;
                    blocks[c][r].x = blockX;
                    blocks[c][r].y = blockY;
                    ctx.beginPath();
                    ctx.rect(blockX, blockY, blockWidth, blockHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    function draw() {
        // drawing code
        ctx.clearRect(0, 0, canvas.width(), canvas.height());
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        // drawLives();
        collisionDetection();

        // bounce off side wall
        if (x + dx > canvas.width() - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        // bounce off top wall
        if (y + dy < ballRadius) {
            dy = -dy;
        }
        // bottom wall       
        else if (y + dy > canvas.height() - ballRadius) {
            // if ball hits paddle bounce back
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            // if ball hits wall end game
            else {
                // lives--;
                document.location.reload();
                // if (!lives) {
                //     // alert("GAME OVER");
                //     document.location.reload();
                // }
                // else {
                //     x = canvas.width / 2;
                //     y = canvas.height - 30;
                //     dx = 3;
                //     dy = -3;
                //     paddleX = (canvas.width - paddleWidth) / 2;
                // }

            }
        }

        // move paddle
        if (rightPressed && paddleX < canvas.width() - paddleWidth) {
            paddleX += 7;
        }
        else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        // move ball
        x += dx;
        y += dy;
        // requestAnimationFrame(draw);
    };
    // run draw function every 10 milliseconds
    setInterval(draw, 10);
    // draw();

    // pause on canvas click
    $(canvas).click(function() {
        alert("Game Paused.")
    });
});