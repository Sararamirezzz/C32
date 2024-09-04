const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var tower;
var backgroundImg;
var canvas
var angle, cannon;
var cannonBall;
var balls = [];
var boat, boats = [];
var ground;
function preload(){
 backgroundImg = loadImage("./assets/background.gif");
}


function setup() {
  //createCanvas(400,400);
  canvas = createCanvas(1200,600);

  engine = Engine.create();
  world = engine.world;

  var options = {
    isStatic: true
  }

  angle = -PI/4
  ground = Bodies.rectangle(0, height-1, width*2, 1, options);
  World.add(world, ground);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180,110,100,50,angle);
  cannonBall = new CannonBall(cannon.x, cannon.y);
  //boat = new Boat(width - 79, height - 60, 170,170,-80);

  /*rectMode(CENTER);
  ellipseMode(RADIUS);*/
}

function draw() 
{
  background(51);
  image(backgroundImg, 0, 0, width, height);
  Engine.update(engine);
  rect(ground.position.x, ground.position.y, width*2, 1);
  tower.display();
  cannon.display();
  //Matter.Body.setVelocity(boat.body,{x:-0.9, y:0});
  //boat.display();
showBoats();

  //cannonBall.display();
 for(var i = 0; i < balls.length; i++){ 
  showCannonBalls(balls[i], i)
 }

}

//funcion para mostrar la bala
function showCannonBalls(ball, index){
  ball.display();
  if(ball.body.position.x >= width || ball.body.position.y >= height -50){
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

function keyReleased(){
  if(keyCode === DOWN_ARROW){
    balls[balls.length - 1].shoot();
  }
}
  function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
   }
}

function showBoats(){
  if(boats.length > 0){
    if(boats[boats.length -1] === undefined || boats[boats.length - 1].body.position.x < width - 300 ){
     var position = [-40, -60, -70, -20];
     var position = random(positions);
     var boat = new Boat(width, height -100, 170, 170, position)
     boats.push(boat); 
    }
     
    for(var i = 0; i<boats.length; i++){
      if(boats[i]){
        Matter.Body.setVelocity(boats[i].body, {x:-0.9, y:0});

        boats[i].display();
      }
    }
   }else{ 
    var boat = new Boat(width, height-60, 170, 170, -60);
    boats.push(boat);
  }
}
