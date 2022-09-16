function preload() {
  preloadModes()
}

function setup() {
  textFont('Andale Mono') // can also try Courier or look at other mono fonts?
  createCanvas(windowWidth, windowHeight)
  setupGrid(16, 16)
  useMode("Reflect Mode")
  //useMode("Just Write")
  //useMode("Test Sounds")
  //useMode("Game of Life")
  //useMode("Wondering Cursor")
  //useMode("Random Mode")
  // frameRate(1)
}

function draw() {
  
  // update unit of measurement
  // shortest width divided by 25 (leaving a border of 2 on each side around grid)
  if (windowWidth > windowHeight) {
    u = windowHeight / 25;
  } else {
    u = windowWidth / 25;
  }
  
  background(0)
  renderGrid(u*0.5, u*0.5, u*16, u*16)
}

function windowResized() {
  // update the canvas size when the window is resized
  resizeCanvas(windowWidth, windowHeight);
}


function keyPressed(e) {
  grid.onKey(e)
}


const renderGrid = (x = 0, y = 0, width = 400, height = 400) => {
  grid.update()
  const fontSize = u*0.75

  // draw border around grid
  /*
  push()
  stroke(0, 192, 0)
  noFill()
  rect(x, y, width, height)
  pop()
  */

  push()
  translate(windowWidth/2 - 8*u, windowHeight/2 - 8*u)
  textSize(fontSize)
  fill(0, 192, 0)
  noStroke()
  grid.forEach((char, index, x, y) => {
    text(char, x * Math.round(width / grid.w), y * Math.round(height / grid.h));
  }, true)
  text(`Mode: ${getModeName(grid)}`, 0, height + fontSize / 2)
  pop()
}