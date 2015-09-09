var menuScreen = function(game){
  patternInd = 0;
  
};

menuScreen.prototype = {
  create: function(){
    var background = this.game.add.sprite(0,0, 'background');
    
    var logo = this.game.add.sprite(0, 2, "logo");
    var easyBtn = this.game.add.button(48, 128, "easy", function(){this.playGame("easy")}, this);
    var mediumBtn = this.game.add.button(48, 160, "medium", function(){this.playGame("medium")}, this);
    var hardBtn = this.game.add.button(48, 192, "hard", function(){this.playGame("hard")}, this);
    var player = this.game.add.sprite(48, 32, "player_single");
    
    for(var a = 0; a < 140; a++){
      this.displayPattern();
    }
  },
  playGame: function(mode){
    this.game.state.start("CodeGame", true, false, mode);
  },
  newSeq: function(){
    this.randomKey();
    keyCode.push(curKey);
    //console.log(keyCode);
  },
  displayPattern: function(){
      var pick = Math.floor(Math.random() * 8);
      var keys = ["up", "down", "left", "right", "A", "B", "X", "Y"];
      var key = keys[pick];
    
      //make the visual icons
      var col = patternInd % 10;
      var row = Math.floor(patternInd / 10) + 2;
      if((row >= 8 && row <= 13) && (col >= 3 && col <= 6)){
        
      }else if((row >= 3 && row <= 4) && (col >= 4 && col <= 5)){
        
      }else{
        var keyIcon = this.game.add.sprite(16 * col, 16 * row, key);
        keyIcon.scale.setTo(0.5,0.5);
      }
        

      patternInd++;
    
  },
};