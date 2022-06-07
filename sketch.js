var play = 0 ;
var End = 1;
var gameState = play ;
var trex, trex_running, edges;
var groundImage;
var ground;
var cloud, cloudimg
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var cloudgroup
var  obstaclegroup
var jumpsSound , checkPointSound,dieSound
var gameOver , restart
var finish , again
var trexcollige

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudimg = loadImage('cloud.png')
  obstacle1 = loadImage('obstacle1.png')
  obstacle2 = loadImage('obstacle2.png')
  obstacle3 = loadImage('obstacle3.png')
  obstacle4 = loadImage('obstacle4.png')
  obstacle5 = loadImage('obstacle5.png')
  obstacle6 = loadImage('obstacle6.png')
  jumpsSound = loadSound ('jump.mp3')
  gameOver = loadImage('gameOver.png')
  restart = loadImage ('restart.png')
trexcollige=loadAnimation('trex_collided.png')
checkPointSound = loadSound ('checkpoint.mp3')
dieSound = loadSound ('die.mp3')


} 

function setup(){
  createCanvas(windowWidth,windowHeight);
ground = createSprite(width/2,height-70,width,5)
  ground.addImage(groundImage)
ground.x =ground.width/2
invisibleground= createSprite (width/2,height-60,width,5)
  invisibleground.visible = false

obstaclegroup = new Group ();
cloudgroup = new Group ();
 
finish = createSprite(width/2,height/2)
finish.addImage(gameOver)

again = createSprite(width/2,height/2+30)
again.addImage(restart)



finish.scale=0.5
again.scale=0.5


finish.visible=false
again.visible=false

  // creating trex
  trex = createSprite(50,height-90,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation('collided',trexcollige);
;

  
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
trex.debug = true
trex.setCollider ('circle',0,0,40)
}


function draw(){


  //set background color 
  background("grey");
  
  if (gameState ===play){
    ground.velocityX=-7
    trex.changeAnimation('running',trex_running);
    if (ground.x<0){
      ground.x=ground.width/2
    
      
    }
  
    gamecloud()
  
    spawnobstacles()
  
    //logging the y position of the trex
    console.log(trex.y)
    
    //jump when space key is pressed
    if((keyDown("space")||touches.length>0)&&trex.y>=height-120)
    {
      trex.velocityY = -10;
      jumpsSound.play();
      touches=[]
      
    }
    
    
    trex.velocityY = trex.velocityY + 0.5;
    
    //stop trex from falling down
    
  if (obstaclegroup.isTouching(trex)){
    gameState=End
    dieSound.play();
  }

  }
  else if (gameState===End){
    ground.velocityX=0
    obstaclegroup.setVelocityXEach (0)
    trex.changeAnimation('collided',trexcollige)

    cloudgroup.setVelocityXEach(0)
    cloudgroup.setLifetimeEach(-1);
    obstaclegroup.setLifetimeEach(-1);

    finish.visible=true;
    again.visible=true

    if (mousePressedOver(again)||touches.length>0){
      reset ();
      touches=[]
    }
  }
  trex.collide(invisibleground)
  
  drawSprites();
}


function gamecloud (){

if(frameCount % 70 ===0){
cloud= createSprite(width+20,height-300,30,30);
cloud.addImage(cloudimg);
cloud.velocityX=-4
cloud.y=random(20,60)
cloud.scale=0.5
cloud.depth=trex.depth
trex.depth=trex.depth+1
cloud.lifetime = 800

cloudgroup.add(cloud)



}

}


function spawnobstacles (){

if (frameCount % 65 ===0  ){

obstacle= createSprite (width,height-90,10,10);

obstacle.velocityX = -6
obstacle.scale=0.4

obstacle. lifetime = 800


var randomnum = Math.round(random(1,6));

obstaclegroup.add(obstacle)

switch ( randomnum){

case 1 : obstacle.addImage (obstacle1);
break;

case 2 : obstacle.addImage (obstacle2);
break;

case 3 : obstacle.addImage (obstacle3);
break;

case 4 : obstacle.addImage (obstacle4);
break;

case 5 : obstacle.addImage (obstacle5);
break;

case 6 : obstacle.addImage (obstacle6);
break;


default:break;

}




}





}


function reset (){
gameState = play ;
finish.visible = false;
again.visible = false;


obstaclegroup.destroyEach ();
cloudgroup.destroyEach();



}




