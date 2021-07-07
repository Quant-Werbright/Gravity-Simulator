class Planet{
  constructor(x,y,x1,y1,mass){
    this.pos  = createVector(x,y);
    this.vel  = createVector(x1,0).rotate(y1);
    this.acc  = createVector();
    this.mass = mass;
    this.size = mass * 1/40;

    this.color = (2)
    this.points = [];
    this.points.push(this.pos);
    this.color = random(['red','green','blue','black','white','yellow'])
  }
  update(){

    //this.vel.rotate(PI/180);
    if (this.points.length > 700){
      this.points = removeEl(this.points);
    }


    this.points.push([this.pos.x,this.pos.y]);
    this.pos.add(this.vel);

  }
  show(){
    this.size = map(this.mass,100,1000000,10,300);
    strokeWeight(4);
    stroke(255,0,255);

  //  point(this.pos.x,this.pos.y);

    ellipse(this.pos.x,this.pos.y,this.size,this.size);
  }
  gravity(){
    for (let otherPlanet of planets){
      if (otherPlanet != this){
        //gravity related stuff
        var forceDir = (p5.Vector.sub(otherPlanet.pos,this.pos)).normalize();
        var distance = p5.Vector.sub(this.pos,otherPlanet.pos).mag() * p5.Vector.sub(this.pos,otherPlanet.pos).mag();

        var force = forceDir.mult(universalGravity).mult(this.mass).mult(otherPlanet.mass).div(distance);//(((forceDir.mult(universalGravity)).mult(this.mass)).mult(otherPlanet.mass)).div(distance);
        this.acc = force.div(this.mass);
        this.vel.add(this.acc);
        //physics

      }
    }
  }
}
