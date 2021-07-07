let universalGravity = 0.00667430;
function track(object){
  let xplus = false,xminus = false,yminus = false,yplus = false;
  if (object.pos.x > width/2){
    xplus = true;
  }
  if (object.pos.x < width/2){
    xminus = true;
  }
  if (object.pos.y > height/2){
    yplus = true;
  }
  if (object.pos.y < height/2){
    yminus = true;
  }
  var distx = (width/2) - object.pos.x;
  var disty = (height/2) - object.pos.y;
  if (xplus || yplus || xminus || yminus){
    for (let p of planets){
      if (xplus){
        p.pos.x += distx;
      }
      if (yplus){
        p.pos.y += disty;
      }
      if (yminus){
        p.pos.y += disty;
      }
      if (xminus){
        p.pos.x += distx;
      }
    }
  }

}
function calculate(object){
  let acc;
  for (let otherPlanet of planets){
    if (otherPlanet != object){
      //gravity related stuff
      var forceDir = (p5.Vector.sub(otherPlanet.pos,object.pos)).normalize();
      var distance = p5.Vector.sub(object.pos,otherPlanet.pos).mag() * p5.Vector.sub(object.pos,otherPlanet.pos).mag();

      var force = forceDir.mult(universalGravity).mult(object.mass).mult(otherPlanet.mass).div(distance);//(((forceDir.mult(universalGravity)).mult(object.mass)).mult(otherPlanet.mass)).div(distance);
      acc = force.div(object.mass);

      //physics

    }
  }
  return acc;
}

function showPath(object,color){
  strokeWeight(3);
  if (color == "green"){
    stroke(0,255,0);
  }
  if (color == "red"){
    stroke(255,0,0);
  }
  if (color == "white"){
    stroke(255,255,255);
  }
  if (color == "blue"){
    stroke(0,0,255);
  }
  if (color == "grey"){
    stroke(100,100,100);
  }
  if (color == "black"){
    stroke(0,0,0);
  }
  if (color == "yellow"){
    stroke(255,255,0);
  }


  for (let i of object.points){

    point(i[0],i[1]);
  }
}
function removeEl(array){
  let ar = [];
  let c = 0;
  for (let a of array){
    if (c > 0){
      ar.push(a);
    }
    c += 1
  }
  return ar;
}
