let cols, rows;
w = screen.width;
h = screen.height;
let scl = 80;
cols = (w/scl)*5;
rows = (h/scl)*5;
let slider1;
let slider2;
let slider3;
let slider4;
let alphaSlider;
let val1;
let val2;
let val3;
let val4;
let terrain = [];
let flying = 0;

let offsetIncrement;
let noiseRange = 800;
let cameraHeight = 100;


function setup() {

  frameRate(24)

  slider1 = createSlider(0.025, 0.1, 0.0625, 0.001);
  slider1.position((w/2)-(w/12)-(w/3), 50);
  slider1.style('width', (w/6) + 'px');

  slider2 = createSlider(100, 1500, 800, 10);
  slider2.position((w/2)-(w/12), 50);
  slider2.style('width', (w/6) + 'px');

  slider3 = createSlider(0, 100, 10, 1);
  slider3.position((w/2)-(w/12)+(w/3), 50);
  slider3.style('width', (w/6) + 'px');

  slider4 = createSlider(0.02,0.2, 0.07, 0.01)
  slider4.position(0-h/5, h/2);
  slider4.size(h/2)
  slider4.style('transform', 'rotate(-90deg)')

  alphaSlider = createSlider(0, 255, 0, 10)
  alphaSlider.position(0, h*0.15);
  alphaSlider.size(h/10)
  alphaSlider.style('transform', 'rotate(-90deg)')

  createCanvas(w,h,WEBGL);
}

function draw() {

  val1 = slider1.value();
  val2 = slider2.value();
  val3 = slider3.value();
  val4 = slider4.value();
  alphaCount = alphaSlider.value();

  offsetIncrement = val1;
  noiseRange = val2;
  cameraHeight = val3;
  flyingIncrement = val4;

  flying -= flyingIncrement;

  let yoff = flying;
  for(let y = 0; y < rows; y++) {
    let xoff = 0;
    terrain[y] = [];
    for(let x = 0; x < cols; x++) {
      terrain[y][x] = map(noise(yoff,xoff), 0, 1, -noiseRange, noiseRange);
      xoff += offsetIncrement;
    }
    yoff += offsetIncrement;
  }

  let cameraRadians = map(cameraHeight, 0, 100, 70, 50);


  // (-h*cameraHeight/100)-100
  let cameraHeightAdjust = map(cameraHeight, 0, 100, -h*4.4, -h*4.8)

  rotateX(radians(cameraRadians));

  translate(-w*2.5,cameraHeightAdjust,(-cameraHeight*10)-150)

  background(0);
  stroke(0,255,0);
  fill(0,255,0,alphaCount);

  for(let y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for(let x = 0; x < cols; x++) {
      vertex(x*scl,y*scl,terrain[y][x]);
      vertex(x*scl,(y+1)*scl,terrain[y+1][x]);
    }
    endShape();
  }
}
