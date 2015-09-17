var menuScreen = function(game){
  pattInd = 0;

};

menuScreen.prototype = {
  create: function(){
    pattInd = 0;
    
    var background = this.game.add.sprite(0,0, 'background');
    
    var logo = this.game.add.sprite(0, 2, "logo");
    var easyBtn = this.game.add.button(48, 128, "easy", function(){this.playGame("easy")}, this);
    var mediumBtn = this.game.add.button(48, 160, "medium", function(){this.playGame("medium")}, this);
    var hardBtn = this.game.add.button(48, 192, "hard", function(){this.playGame("hard")}, this);
    var player = this.game.add.sprite(48, 48, "player_single");
    
    for(var a = 0; a < 140; a++){
      this.displayPattern();
    }
  },
  playGame: function(mode){
    this.game.state.start("CodeGame", true, false, mode);
  },
  displayPattern: function(){
      var pick = Math.floor(Math.random() * 8);
      var keys = ["up", "down", "left", "right", "A", "B", "X", "Y"];
      var key = keys[pick];
    
      //make the visual icons
      var COL = pattInd % 10;
      var ROW = Math.floor(pattInd / 10) + 2;
      
      if((ROW >= 8 && ROW <= 13) && (COL >= 2 && COL <= 7)){          //buttons
          
      }else if((ROW >= 3 && ROW <= 6) && (COL >= 3 && COL <= 6)){     //sprite
        
      }else{
        var keyIcon = this.game.add.sprite(16 * COL, 16 * ROW, key);
        keyIcon.scale.setTo(0.5,0.5);
      }
        

      pattInd++;
    
  },
};