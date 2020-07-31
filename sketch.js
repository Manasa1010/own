var PLAY=1;
var END=0;
var gameState=PLAY;
var start=2;
var player;
var ground;
var obstaclesGroup,coinGroup;
var score=0;
var win;
var bg,ghost;
var flag=0;

function preload(){
  playerImg=loadAnimation("sprites/biker1.png","sprites/biker2.png","sprites/biker3.png");
  player_stop=loadAnimation("sprites/biker_stop.png");
  coinImg=loadImage("sprites/coin.png");
  bg=loadImage("sprites/bg1.jpg");
  ghost=loadImage("sprites/ghost.png");
  grandma=loadImage("sprites/grandma.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  back=createSprite(width/2,height/2,width,height);
  back.addImage(bg);
  back.scale=3.5;

  player= createSprite(200, 280, 50, 50);
  player.addAnimation("cycing",playerImg);
  player.addAnimation("player",player_stop);
  player.scale=0.4;

  win=createSprite(600,250,10,10);
  win.addImage("grandma",grandma);
  win.scale=0.08;
  win.visible=false;
  
  ground=createSprite(width/2,height-150,width,2);
  ground.visible=true;

  restart=createSprite(400,200,20,20);

  restart.visible=false;

  obstaclesGroup=new Group();
  coinGroup=new Group();

  textSize(40);
  textFont("Georgia");
  fill(255);
 
}

function draw() {
  background(0);  
  
  
  if(gameState===1){
    back.velocityX=-7;
    
    if(back.x<80){
      back.x=back.width/2;
    }
   
    if(touches.length>0||keyIsDown(32) && player.y>=254.8){
      player.velocityY=-30;
      touches=[];
    }

    player.velocityY=player.velocityY+2;
    obstacles();
    coin();
    
    if(player.isTouching(coinGroup)){
      score=score+1;
      coinGroup.destroyEach();
    }
    if(score===10){
      gameState=2;
    }
    if(player.isTouching(obstaclesGroup)){
      gameState=0;
      restart.visible=true;
    }
  }else if(gameState===0){ 
    back.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-3);
    coinGroup.setLifetimeEach(-3);
    player.velocityY=0;
    player.changeAnimation("player",player_stop);
    
    flag=2;
   
  }else if(gameState===2){
    player.velocityY=player.velocityY+2;
    win.visible=true;
    win.velocityX=-7 
    back.velocityX=-7;
    
    if(back.x<0){
      back.x=back.width/2;
    }

    if(player.isTouching(win)){
      back.velocityX=0;
      win.velocityX=0
      obstaclesGroup.destroyEach();
      coinGroup.destroyEach();
      player.changeAnimation("player",player_stop);
      flag=1;
    }
  }

  if(mousePressedOver(restart)){
    reset();
  }
 
  player.collide(ground);
  console.log(ghost);

  drawSprites(); 

  if(flag===1){
    text("You WIN",400,200)
  }else if(flag===2){
    text("You Lose",400,200);
  }

  text("Score: "+score,600,50);
 
}

function obstacles(){
  if(frameCount%100===0){
  var obstacle=createSprite(width,height-200,30,30);
  obstacle.addImage(ghost);
  obstacle.scale=0.8;
  obstacle.shapeColor="red";
  obstacle.velocityX=-12;
  obstacle.lifetime=400;
  obstaclesGroup.add(obstacle);
  }
}

function coin(){
  if(frameCount%130===0){
    var coin=createSprite(width,height-250,15,15);
    coin.velocityX=-12;
    coin.shapeColor="gold";
    coin.addImage(coinImg);
    coin.scale=0.5;
    coin.lifetime=400;
    coinGroup.add(coin);
  }
}

function reset(){
  gameState=1;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  coinGroup.destroyEach();
  player.changeAnimation("cycing",playerImg);
  score=0;
  flag=0;
}