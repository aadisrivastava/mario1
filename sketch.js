var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mario, mario_running, mario_collided;
var ground, invisibleGround, groundImage;

var bricksGroup, brickImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;



function preload(){
  bg=loadImage("bg.png")
  mario_running =   loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
  mario_collided = loadAnimation("collided.png");
  
  groundImage = loadImage("ground2.png");
  
  brickImage = loadImage("brick.png");
  
  obstacleimage = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);
 mario = createSprite(50,140,20,20);
 mario.addAnimation("running",mario_running);
 mario.addAnimation("collided",mario_collided);
 mario.scale=1;

  ground =createSprite(200,190,1500,20);
  ground.addImage(groundImage);
 // ground.x=ground.width/2;
  ground.velocityX=-(6+3*score/100);
  ground.scale=0.6;

  invisibleGround=createSprite(200,180,1000,20);
  invisibleGround.visible=false;
  
  bricksGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(bg);
  if(ground.x<0){
    ground.x=ground.width/2;
  
  }
  if(keyDown("space")){
    mario.velocityY=-10;
  }
  mario.velocityY=mario.velocityY+0.8;
  mario.collide(invisibleGround);
  spawnObstacles();
  spawnBricks();
  drawSprites();
}
function spawnBricks() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
   var brick = createSprite(600,120,40,10);
    brick.y = Math.round(random(80,120));
    brick.addImage(brickImage);
    brick.scale = 0.9;
    brick.velocityX = -3;
    
     //assign lifetime to the variable
    brick.lifetime = 200;
    
    //adjust the depth
    brick.depth = mario.depth;
    mario.depth = mario.depth + 1;
    
    //add each cloud to the group
    bricksGroup.add(brick);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
   // var rand = Math.round(random(1,6));
   obstacle.addAnimation(obstacleimage);
    }
    
    //assign scale and lifetime to the obstacle           
    
    //obstacle.lifetime = 300;
    //add each obstacle to the group
   // obstaclesGroup.add(obstacle);
  }

/*
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}*/