class Point {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.flag = false;
    }
    display() {
        let vec = createVector(this.x, this.y);
        let target = createVector(scaled[this.id][0], scaled[this.id][1]);
        let di = vec.dist(target);
        colorMode(HSB, MAX_DIST, 1, 1);
        fill(di, 1, 1);
        ellipse(this.x, this.y, 3);
    }
    update() {
        let target = createVector(scaled[this.id][0], scaled[this.id][1]);
        if (this.flag === false) {
            let temp = [createVector(this.x + 1, this.y), createVector(this.x + 1, this.y + 1),
                    createVector(this.x, this.y + 1), createVector(this.x - 1, this.y + 1), 
                    createVector(this.x - 1, this.y), createVector(this.x - 1, this.y - 1), 
                    createVector(this.x, this.y - 1), createVector(this.x + 1, this.y - 1)];
            let vals = [];
            for (let i = 0; i < temp.length; i++) {
                vals[i] = temp[i].dist(target);
            }
            let MIN = min(vals);
            switch(MIN) {
                case temp[0].dist(target):
                    this.x += Math.log(1/(temp[0].dist(target) / MAX_DIST));
                    this.y += 0;
                    break;
                case temp[1].dist(target):
                    this.x += Math.log(1/(temp[1].dist(target) / MAX_DIST));
                    this.y += Math.log(1/(temp[1].dist(target) / MAX_DIST));
                    break;
                case temp[2].dist(target):
                    this.x += 0;
                    this.y += Math.log(1/(temp[2].dist(target) / MAX_DIST));
                    break;
                case temp[3].dist(target):
                    this.x -= Math.log(1/(temp[3].dist(target) / MAX_DIST));
                    this.y += Math.log(1/(temp[3].dist(target) / MAX_DIST));
                    break;
                case temp[4].dist(target):
                    this.x -= Math.log(1/(temp[4].dist(target) / MAX_DIST));
                    this.y -= 0;
                    break;
                case temp[5].dist(target):
                    this.x -= Math.log(1/(temp[5].dist(target) / MAX_DIST));
                    this.y -= Math.log(1/(temp[5].dist(target) / MAX_DIST));
                    break;
                case temp[6].dist(target):
                    this.x += 0;
                    this.y -= Math.log(1/(temp[6].dist(target) / MAX_DIST));
                    break;
                case temp[7].dist(target):
                    this.x += Math.log(1/(temp[7].dist(target) / MAX_DIST));
                    this.y -= Math.log(1/(temp[7].dist(target) / MAX_DIST));
                    break;
            }
        }
        let P = createVector(mouseX, mouseY);
        let newV = createVector(this.x, this.y);
        let D = newV.dist(P);
        if (mouseX > 0 && mouseX < W && mouseY > 0 && mouseY < H) {
            if (D < r) {
                let SIGMA = atan2((newV.y - P.y), (newV.x - P.x));
                this.x = r * Math.cos(SIGMA) + P.x;
                this.y = r * Math.sin(SIGMA) + P.y;
            } 
        }
        newV = createVector(this.x, this.y);
        if (newV.dist(target) < 1) {
            this.flag = true;
        } else {
            this.flag = false;
        }
    }
}