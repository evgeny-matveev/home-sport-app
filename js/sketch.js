function setup() {
    let myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent("canvas");
    background(255);
}

function draw() {
    fill(255, 15);
    noStroke();
    rect(0, 0, windowWidth, windowHeight);

    stroke(0);
    if (mouseIsPressed) {
        fill(0);
    } else {
        fill(255);
    }
    ellipse(mouseX, mouseY, 80, 80);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}