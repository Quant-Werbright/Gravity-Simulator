let planets;
let planetSelected,planetSelectedPos, planetIsSelected = false,tracking = true;
let sun;
let checkBoxes = [],c = 1;
let trackingPlanet,createPlanet,pauseButton,trackSun,deleteButton;
let velocitySlider,angleSlider,massSlider,iterationSlider;

function setup(){

  let c = createCanvas(windowWidth-250,windowHeight);
  velocitySlider = createSlider(-7,7,0,0.5);

  pauseButton = createButton('Replay');
  trackSun = createCheckbox('Track The Sun?',true);
  trackSun.position(windowWidth-150,500);
  pauseButton.size(64,64);
  background(40,40,40);
  pauseButton.position(500,100);
  textSize(32);
  iterationSlider = createSlider(0,200,10,1);
  iterationSlider.position(windowWidth-150,450);
  velocitySlider.position(windowWidth-150,100);
  angleSlider = createSlider(0,360,0,1);
  angleSlider.position(windowWidth-150,200);
  massSlider = createSlider(100,1800000,8000,1);
  massSlider.style('width','200px')
  massSlider.position(windowWidth-200,300);
  planets = [];

  deleteButton = createButton("Delete Selected Planet");
  deleteButton.size(75,75);
  deleteButton.position(200,100);
  createPlanet = createButton("Create New Planet");
  createPlanet.position(100,100);
  createPlanet.size(64,64);
  planets.push(new Planet((width/2),height/2,0,0,80000));
  trackingPlanet = planets[0];


}

let updating = true;

function newPlanet(){
  updating = false;
  planetIsSelected = false;
  planets.push(new Planet(300,300,0,0,800));

}
function pause(){
  planetIsSelected = false;
  console.log("done!");
  updating = true;
  planetIsSelected = false;
}
function deletePlanet(){
  planets.splice(planetSelectedPos,1);
}
let points = [];
function draw(){
  background(40,40,40);
  createPlanet.mousePressed(newPlanet);
  if (updating){
    for (let i  =0;i<iterationSlider.value();i++){
      for (let planet of planets){
        planet.gravity();

      }
      for (let planet of planets){
        planet.update();

      }
    }
    if (tracking){  track(trackingPlanet);console.log("tracking");}

    textSize(32);
    fill(0,0,0);
    for (let planet of planets){

      planet.show();
      showPath(planet,planet.color);
    }
  }else{
    for (let i of planets){
      i.show();
    }
  }
  pauseButton.mousePressed(pause);

  text('Speed',width-100,450);
  trackSun.changed(doThat);




  if (planetIsSelected == true){
    deleteButton.mousePressed(deletePlanet);
    let okay = true;
    if (mouseIsPressed &&  mouseX < 564 && 500 < mouseX &&  mouseY < 164 && 100 < mouseY ){
      okay = false;
    }
    if(okay && mouseIsPressed && mouseX < width && mouseY < height ){
    planetSelected.pos = createVector(mouseX,mouseY);
    }
    let pos = createVector(planetSelected.pos.x,planetSelected.pos.y);
    //showing path


    //text
    stroke(255);
    textSize(32);
    text("Velocity",width-250,150);
    text(velocitySlider.value(),width-100,150);
    text("angle",width-200,250);
    text(angleSlider.value(),width-100,250);
    text("mass",width-200,350);
    text(massSlider.value(),width-100,350);
    //values
    planetSelected.mass = massSlider.value();
    planetSelected.vel = createVector(velocitySlider.value(),0).rotate(angleSlider.value()*(355/113)/180);

    //drawing
    let x1 = planetSelected.pos.x,y1 = planetSelected.pos.y;
    let v = planetSelected.vel;
    line(x1,y1,x1+(v.x*30),y1+(v.y*30));
    ellipse(x1+(v.x*30),y1+(v.y*30),10,10);

  }

}

function doThat(){
  if (tracking){
    tracking = false;
  }else{
    tracking = true
  }
}
function mousePressed(){
  var mos = createVector(mouseX,mouseY);
  let c = 0;

  if(planetIsSelected == false){
    for (let i of planets){
      if (p5.Vector.sub(mos,i.pos).mag() < i.size){
        planetIsSelected = true;
        planetSelected = i;
        updating = false;
        planetSelectedPos = c;
      }
      c++;
    }
  }

}
