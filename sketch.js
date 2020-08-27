var database;
var back_img;
var gameState =0;
var playerCount = 0;
var allPlayers;

var player,form,game;
var player1,player2;
var player1Score,player2Score;
var players;
var fruits;
var fruitGroup;
var fruit1_img, fruit2_img, fruit3_img, fruit4_img, fruit5_img;
var player_img;
var hitSound,gameEndSound;

function preload(){
  back_img = loadImage("images/jungle.jpg");
  player_img = loadImage("images/basket2.png");
  fruit1_img = loadImage("images/apple2.png");
  fruit2_img = loadImage("images/banana2.png");
  fruit3_img = loadImage("images/melon2.png");
  fruit4_img = loadImage("images/orange2.png");
  fruit5_img = loadImage("images/pineapple2.png");
  fruitGroup = new Group();

  hitSound = loadSound("HitSound.mp3");
  gameEndSound = loadSound("GameEndSound.mp3");
}
function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  
}

function draw() {
  background(back_img);
  
   if (playerCount === 2) {
     game.update(1);
   }
   if (gameState === 1) {
     clear(); 
     game.play();
   }
   if (gameState === 2) {
    
     game.end();
   }

   if(fruitGroup.isTouching(player1))
   {
     hitSound.play();
     fruitGroup.destroyEach();
     player1Score = player1Score + 1;
   }

   if(fruitGroup.isTouching(player2))
   {
     hitSound.play();
     fruitGroup.destroyEach();
     player2Score = player2Score + 1;
   }
}

function isTouching(object1,object2)
{
if(object1.x - object2.x < object2.width/2 + object1.width/2 &&
  object2.x - object1.x < object2.width/2 + object1.width/2 &&
  object1.y - object2.y < object2.height/2 + object1.height/2 &&
  object2.y - object1.y < object2.height/2 + object1.height/2)
{
  return true;
}
else
{
  return false;
}
}

function bounceOff(object1,object2)
{
if(object1.x - object2.x < object2.width/2 + object1.width/2 &&
  object2.x - object1.x < object2.width/2 + object1.width/2)
{
  object1.velocityX = object1.velocityX * (-1);
  object2.velocityX = object2.velocityX * (-1);
}

if(object1.y - object2.y < object2.height/2 + object1.height/2 &&
  object2.y - object1.y < fixedRect.height/2 + object1.height/2)  
{
  object1.velocityY = object1.velocityY * (-1);
  object2.velocityY = object2.velocityY * (-1);
}

if(object1.isTouching(topEdge)) 
{
  object1.velocityY = 5;
} 

if(object1.isTouching(bottomEdge)) 
{
  object1.velocityY = -5;
}

if(object2.isTouching(topEdge)) 
{
  object2.velocityY = 5;
} 

if(object2.isTouching(bottomEdge))
{
  object2.velocityY = -5;
}
}