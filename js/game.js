class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    player1Score = 0;
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    player2Score = 0;

    players=[player1,player2];

        }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();
                 image(back_img, 0, 0, 1000, 800);
                 var x =100;
                 var y=200;
                 //var scores = 0;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500-allPlayers[plr].distance;
                     y=500;
                     //scores = allPlayers[plr].scores;
                     
                     players[index-1].x = x;
                     players[index-1].y = y;

                    // players[index-1].scores = scores;
                       
                     if(index === player.index){
                         
                         fill("black");
                         textSize(25);
                         text(allPlayers[plr].name ,x-25,y+25);
                         //text(allPlayers[plr].score,200,100);
                         
                     }
                     fill("white");
                     textSize(35);
                     text("Player 1 Score: "+player1Score,500,100);
                     text("Player 2 Score: "+player2Score,500,200);
                    
                     
                 
                 }
                
                
                 

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
                 if (frameCount % 20 === 0) {
                     fruits = createSprite(random(100, 1000), 0, 100, 100);
                     fruits.velocityY = 6;
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit1", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit1", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit1", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit1", fruit5_img);
                         break;
                     }
                     fruitGroup.add(fruits);
                     
                 }

                 if(player1Score == 10 || player2Score == 10)
                 {
                     gameState = 2;
                 }
                 
                /* if(fruitGroup.x == player1.x && fruitGroup.y == player1.y)
                 {
                     player1Score = player1Score + 1;
                     fruitGroup.destroyEach();
                 }*/
                  /*if(player.index !== null) {
                      fruitGroup.destroyEach();
                     player1Score = player1Score + 1;
                  }*/       

    }

    end(){
       console.log("Game Ended");
       fill("white");
       text("Game Has Ended",500,300);
       gameEndSound.play();
       drawSprites();
    }

}