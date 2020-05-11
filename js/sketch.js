function setup() {
    // Создаем канвас, как весь браузер
    let myCanvas = createCanvas(windowWidth, windowHeight);
    // прикрепляем канвас в заранее созданный элемент
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

// Изменяем размер канваса, если изменился размер окна
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}