var PLAY = 1, END = 0, gameState = PLAY;

var monkey, monkey_running, monkey_hit;
var ground;
var banana, bananaImage;

var backImage;
var score;

var obstacle, obstaclesGroup, obstaclesImage


function preload() {
  backImage = loadImage("jungle.png");
  monkeyRunning = loadAnimation("Monkey_01.png");
  monkeyHit = loadAnimation("Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstaclesImage = loadImage("stone.png");

}


function setup() {
  createCanvas(600, 200);
  
  monkey = createSprite(40,180,20,50);                 monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.5;
  monkey.addAnimation("hit", monkey_hit);
  
  ground = createSprite(200,180,400,20);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  ground.visibility = false;
  
  obstaclesGroup = new Group();
   bananasGroup = new Group();
  score = 0;
}

function draw() {
  background(220);

  if(gameState === PLAY) {
  
    score = score + Math.round(getFrameRate()/60);
  
     if(keyDown("space")) {
       monkey.velocityY = -10;
     } 

  monkey.velocityY = monkey.velocityY + 0.8
  
      if (ground.x < 0){
        ground.x = ground.width/2;
     }
  
    ground.velocityX = -4;
    
    spawnBananas();
    spawnObstacles();
    
    if(monkey.isTouching(bananasGroup)) {
      bananasGroup.destroyEach();
      score = score+1;
    }
  
    if(obstaclesGroup.isTouching(monkey)) {
      gameState = END;
    }

  else if(gameState === END) {

    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
    
    monkey.changeAnimation("hit", monkey_hit);
    
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
    
    text("Score: "+ score, 500,50);
    
    monkey.collide(ground);
    
    drawSprites();
    
    
    }
  }
}

function spawnBananas() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -3;
    
    banana.lifetime = 200;
    
   banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananasGroup.add(banana);
  }
  
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;

    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
  }
}