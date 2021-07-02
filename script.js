let W = window.innerWidth;
let H = window.innerHeight;
let L = 0;
let MAX_DIST = 0;
let r = 60;
let count = 0;
let arr = [];
let scaled = [];
let w = 0;
let h = 0;
let p1 = 0;
let p2 = 0;

function setup() {
    createCanvas(W, H);
    background(0);
    L = initialImage.length;
    MAX_DIST = Math.sqrt(W*W/4 + H*H/4);
    for (let k = 0; k < L; k++) {
        scaled[k] = [random(0, W), random(0, H)];  
    }
    for (let i = 0; i < L; i++) {
        arr[i] = new Point(random(0, W), random(0, H), i);
    }
}

function draw() {
    //background(0);
    if (frameCount % 2 === 0) {
        p1 = createVector(mouseX, mouseY);
    } 
    if (frameCount % 2 != 0) {
        p2 = createVector(mouseX, mouseY);
    }
    if (frameCount > 1) {
        let d = p1.dist(p2);
        r = d + 10;
    }
    for (let i = 0; i < L; i++) {
        if (arr[i].flag === true) {
            count += 1;
        }
        arr[i].display();
        arr[i].update();
    }
    if (count === L) {
        noLoop();
    } else {
        count = 0;
    }
    count = 0;
}

