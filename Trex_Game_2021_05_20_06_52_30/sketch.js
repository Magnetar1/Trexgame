var trex, trex_running, trex_collided, edges;
var groundImage, ground;
var invisible_ground
var cloud, cloud_image;
var obstacle, obstacle1_image, obstacle2_image, obstacle3_image, obstacle4_image, obstacle5_image, obstacle6_image 
var obstacleGroup, cloudGroup
var gamestate="play"
var score, highscore
var gameOver, gameOverImage
var restart , restartImage

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png")
  groundImage = loadImage("ground2.png")
  cloud_image = loadImage("cloud.png")
  obstacle1_image = loadImage("obstacle1.png")
  obstacle2_image = loadImage("obstacle2.png")
  obstacle3_image = loadImage("obstacle3.png")
  obstacle4_image = loadImage("obstacle4.png")
  obstacle5_image = loadImage("obstacle5.png")
  obstacle6_image = loadImage("obstacle6.png")
  gameOverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
}

function setup(){
  createCanvas(600,200);
  score = 0
  highscore = 0

  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  edges = createEdgeSprites();
  restart = createSprite(20, 20);
  restart.scale = 0.5;
  restart.addImage(restartImage)
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage)
  //Creating ground
  ground = createSprite(0,190,120000000,20)
  ground.addImage(groundImage)
  ground.velocityX = -5;
  //Creating invisible ground
  invisible_ground = createSprite(0,194,8000,1);
  invisible_ground.visible = false 
  obstacleGroup = new Group()
  cloudGroup = new Group()
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50;
  trex.setCollider("circle",0,0,50)
  trex.debug=true
}


function draw(){
  //set background color 
  background("white");
  textSize(20)
  if(mousePressedOver(restart)){
    gamestate="play"
    score = 0
    ground.velocityX = -5
    obstacleGroup.destroyEach()
    cloudGroup.destroyEach()
    trex.changeAnimation("running", trex_running)
  }
  
  if(gamestate==="play"){
    if(ground.x<0){
    ground.x= ground.width/2
    }
    if(keyDown("space")&&trex.y>159){
    trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.5;
    create_obstacle()
    create_cloud()
    score = score + 1
    gameOver.visible = false
    
  
  }

  console.log(getFrameRate())
  //stop trex from falling down
  trex.collide(invisible_ground)
  if(trex.isTouching(obstacleGroup)){
    ground.velocityX=0
    obstacleGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
    gamestate="end"
  }
if(gamestate==="end"){
  cloudGroup.setLifetimeEach(-1)
  obstacleGroup.setLifetimeEach(-1)
  trex.velocityY = 10
  trex.collide(obstacleGroup)
  trex.velocityX = 0
  background(180,60,60)
  trex.changeAnimation("collided", trex_collided)
  
  gameOver.visible = true
  if(score>highscore){
    highscore = score
  }

}
  text(score, 520, 20)  
  text(highscore, 400, 20)
  drawSprites();
}
function create_cloud(){
  var rand=Math.round(random(80,200))
  if(frameCount%rand===0){
     cloud = createSprite(600,50,10,30)
     cloud.velocityX = -2
     cloud.y=random(30,70)
     cloud.addImage(cloud_image)
     cloud.scale = 0.7
     cloud.lifetime = 320;
     cloud.depth = trex.depth
     trex.depth = trex.depth+1
     cloudGroup.add(cloud)
  }
}

function create_obstacle(){
  if (frameCount%60===0){
    obstacle = createSprite(600,170,12,12)
    obstacle.velocityX = -5
    var rand = Math.round(random(1, 6))
    switch(rand){
case 1:obstacle.addImage(obstacle1_image);break;
case 2:obstacle.addImage(obstacle2_image);break;
case 3:obstacle.addImage(obstacle3_image);break;
case 4:obstacle.addImage(obstacle4_image);break;
case 5:obstacle.addImage(obstacle5_image);break;
case 6:obstacle.addImage(obstacle6_image);break;
    }
    obstacle.scale = 0.5
    obstacle.lifetime = 320
    obstacleGroup.add(obstacle)
  }
  
  
}

