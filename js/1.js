const log = (g) => { console.log(g) };

let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'absolute';
canvas.style.left = 0;
canvas.style.top = 0;
document.body.appendChild(canvas);


var numStars = 500;
var radius = '0.' + Math.floor(Math.random() * 9) + 1;
var focalLength = canvas.width * 2;
var warp = 0;
var X = canvas.width / 2,
    Y = canvas.height / 2;

var stars = [],
    star;
var i;
let angle = 0;

// function Stars() {
//     this.w = 5;
//     this.h = 5;
//     this.x = canvas.width / 2;
//     this.y = canvas.height / 2;
//     this.z = canvas.width * 2; // Math.random() * canvas.width;
//     this.o = '0.' + Math.floor(Math.random() * 99) + 1;
//     this.xx = Math.random() * canvas.width;
//     this.yy = Math.random() * canvas.height;
//     this.zz = Math.random() * canvas.width;
//     this.r = 5;
//     this.warp = 0;
// }


window.addEventListener('resize', () => {
    // Resize to the screen
    if (canvas.width != window.innerWidth || canvas.width != window.innerWidth) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeStars();
    }
});

window.addEventListener('dblclick', () => { cancelAnimationFrame(recAnimFrame) });

window.addEventListener('load', () => { start() });


function start() {
    upDate();
    draw();
    recAnimFrame = requestAnimationFrame(start);
};


initStars();

function initStars() {

    for (i = 0; i < numStars; i++) {
        star = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width,
            o: '0.' + Math.floor(Math.random() * 99) + 1
        };
        stars.push(star);
    }
}



function upDate() {
    for (i = 0; i < numStars; i++) {
        star = stars[i];
        star.z--;

        if (star.z <= 0) {
            star.z = canvas.width;
        }
    }
};





function draw() {
    var pixelX, pixelY, pixelRadius;

    if (warp == 0) {
        ctx.fillStyle = "rgba(0,10,20,1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.fillStyle = "rgba(209, 255, 255, " + radius + ")";
    for (i = 0; i < numStars; i++) {
        star = stars[i];

        pixelX = (star.x - X) * (focalLength / star.z);
        pixelX += X;
        pixelY = (star.y - Y) * (focalLength / star.z);
        pixelY += Y;
        pixelRadius = 1 * (focalLength / star.z);


        ctx.beginPath()

        ctx.arc(canvas.width / 2, canvas.height / 2, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.save();
        ctx.translate(X, Y);
        ctx.rotate(angle);
        ctx.fillRect(pixelX / -2, pixelY / -2, pixelRadius, pixelRadius);
        ctx.fillStyle = "rgba(209, 255, 255, " + star.o + ")";
        ctx.restore();
        //c.fill();

        angle += 1 * Math.PI / 180;



    }
};