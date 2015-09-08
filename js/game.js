var codeGame = function(game){
  keyCode = [];
  index = 0;
  score = 0;
  
  curKey = null;
  codeTxt = null;

  pick = null;
  keys = ["up", "down", "left", "right", "A", "B", "X", "Y"];
  
  myCode = [];
  codeIcons = null;
  
  turn = "";
  patternInd = 0;
  
  check = null;
  result = null;
};
codeGame.prototype = {
  create: function(){
    //keyCode = ["up", "down", "left", "right"];
    keyCode = [];
    this.newSeq();
    patternInd = 0;
    turn = "game"
    
    
    pick = Math.floor(Math.random() * 8);

    myCode = [];
    codeIcons = [];
    
    var background = this.game.add.sprite(0,0, 'background');
    
    var playerGame = this.game.add.sprite(48, 80, "player");
    playerGame.frame = 0;
    
    var up = this.game.add.button(64, 48, "up", function(){this.presskey("up")}, this);
    var left = this.game.add.button(16, 96, "left", function(){this.presskey("left")}, this);
    var right = this.game.add.button(112, 96, "right", function(){this.presskey("right")}, this);
    var down = this.game.add.button(64, 144, "down", function(){this.presskey("down")}, this);
    
    var x = this.game.add.button(16, 48, "X", function(){this.presskey("X")}, this);
    var y = this.game.add.button(112, 48, "Y", function(){this.presskey("Y")}, this);
    var a = this.game.add.button(16, 144, "A", function(){this.presskey("A")}, this);
    var b = this.game.add.button(112, 144, "B", function(){this.presskey("B")}, this);
    
    quit = this.game.add.button(48, 200, "quit", this.quitGame, this);
    quit.visible = false;
    result = this.game.add.sprite(16, 48, "win-lose");
    result.visible = false;
    check = this.game.add.button(64, 200, "check", this.nextStage, this);
    check.visible = false;
    
    
  },
  update: function(){
    if(turn == "game"){
      result.visible = false;
      codeIcons = [];
      patternInd = 0;
      index = 0;
      for(var b = 0; b < keyCode.length; b++)
        this.displayPattern();
      //this.game.time.events.repeat(Phaser.Timer.SECOND * 1, keyCode.length, this.displayPattern, this);
    }else if(turn == "player"){
      check.visible = false;
      quit.visible = true;
    }
  },
  randomKey: function(){
    pick = Math.floor(Math.random() * 8);
    curKey = keys[pick];
  },
  newSeq: function(){
    this.randomKey();
    keyCode.push(curKey);
    //console.log(keyCode);
  },
  displayPattern: function(){
    if(turn == "game"){
      //if overflowing
      if(codeIcons.length % 20 == 0 && codeIcons.length !== 0){
        for(var i = 0; i < 20; i++){
          codeIcons[i].destroy();
        }
        codeIcons = [];
      }
      
      //make the visual icons
      var col = patternInd % 10;
      var row = Math.floor(patternInd / 10) % 2;
      var keyIcon = this.game.add.sprite(16 * col, 16 * row, keyCode[patternInd]);
      keyIcon.scale.setTo(0.5,0.5);
      codeIcons.push(keyIcon);
      
      patternInd++;
      
      if(patternInd == keyCode.length){
        check.visible = true;
        turn = "wait"
      }
        
    }
    
  },
  presskey: function(key){
    if(turn == "player"){
      //if overflowing
      if(myCode.length % 20 == 0 && codeIcons.length !== 0){
        for(var i = 0; i < 20; i++){
          codeIcons[i].destroy();
        }
        codeIcons = [];
      }
      
      //add to the code
      myCode.push(key);
      
      //make the visual icons
      var col = index % 10;
      var row = Math.floor(index / 10) % 2;
      var keyIcon = this.game.add.sprite(16 * col, 16 * row, key);
      keyIcon.scale.setTo(0.5,0.5);
      codeIcons.push(keyIcon);
      
      //check if right
      if(key != keyCode[index]){
        result.frame = 1;
        result.visible = true;
        check.visible = false;
        quit.visible = true;
        turn = "end"
        //this.game.time.events.repeat(Phaser.Timer.SECOND * 3, keyCode.length, this.quitGame, this);
      }
      index++;
      
      if(index == keyCode.length && turn == "player"){
        result.frame = 0;
        result.visible = true;
        turn = "end"
        check.visible = true;
        quit.visible = false;
        //this.game.time.events.repeat(Phaser.Timer.SECOND * 3, keyCode.length, function(){this.newSeq();turn = "game";}, this);
      }
    }
  },
  nextStage: function(){
    if(turn == "end"){
      index = 0;
      this.newSeq();
      check.visible = false;
      quit.visible = false;
      turn = "game";
      patternInd = 0;
      console.log("You win!")
      for(var a = 0; a < codeIcons.length; a++){
        codeIcons[a].destroy();
      }
      codeIcons = [];
    }else{
      index = 0;
      turn = "player";
      myCode = [];
      for(var a = 0; a < codeIcons.length; a++){
        codeIcons[a].destroy();
      }
      codeIcons = [];
    }
    
  },
  quitGame: function(){
    this.game.state.start("GameOver");
  }
}