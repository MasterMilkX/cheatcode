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
  
  playerGame = null;
  
  turn = "";
  patternInd = 0;
  
  check = null;
  result = null;
  timecheck = null;
  timeLimit = 750;
};
codeGame.prototype = {
  create: function(){
    //keyCode = ["up", "down", "left", "right"];
    keyCode = [];
    this.newSeq();
    patternInd = 0;
    turn = "game"
    
    this.restartTime();
    
    pick = Math.floor(Math.random() * 8);

    myCode = [];
    codeIcons = [];
    
    var background = this.game.add.sprite(0,0, 'background');
    
    playerGame = this.game.add.sprite(48, 80, "player");
    playerGame.frame = 0;
    var pn = playerGame.animations.add('default', [0], 3, false);
    var pr = playerGame.animations.add("right", [1], 3, false);
    pr.onComplete.add(this.backDefault, this);
    var pl = playerGame.animations.add("left", [2], 3, false);
    pl.onComplete.add(this.backDefault, this);
    var pu = playerGame.animations.add("up", [3], 3, false);
    pu.onComplete.add(this.backDefault, this);
    var pd = playerGame.animations.add("down", [4], 3, false);
    pd.onComplete.add(this.backDefault, this);
    var pa = playerGame.animations.add("A", [5], 3, false);
    pa.onComplete.add(this.backDefault, this);
    var pb = playerGame.animations.add("B", [0,6,7,8], 12, false);
    pb.onComplete.add(this.backDefault, this);
    var px = playerGame.animations.add("X", [9], 3, false);
    px.onComplete.add(this.backDefault, this);
    var py = playerGame.animations.add("Y", [10], 3, false);
    py.onComplete.add(this.backDefault, this);
    
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
  backDefault: function(){
    playerGame.animations.play("default");
  },
  update: function(){
    if(turn == "game"){
      result.visible = false;

      if(patternInd < keyCode.length){
        if(this.game.time.now - timeCheck > timeLimit){
          this.displayPattern();
          this.restartTime();
        }
      }
      //this.game.time.events.repeat(Phaser.Timer.SECOND * 1, keyCode.length, this.displayPattern, this);
    }else if(turn == "player"){
      check.visible = false;
      quit.visible = true;
    }else if(turn == "end"){
      if(this.game.time.now - timeCheck > 1500){
        this.quitGame();
      }
    }
    
  },
  restartTime: function(){
    timeCheck = this.game.time.now;
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
      
      playerGame.animations.play(keyCode[patternInd]);
      patternInd++;
      
      if(patternInd == keyCode.length){
        //check.visible = true;
        //turn = "wait";
        turn = "player";
        myCode = [];
        index = 0;
      }
        
    }
    
  },
  presskey: function(key){
    if(turn == "player"){
      //if overflowing
      if(index === 0 && codeIcons.length !== 0){
        for(var i = 0; i < codeIcons.length; i++){
          codeIcons[i].destroy();
        }
        codeIcons = [];
      }
      
      //if overflowing
      if(myCode.length % 20 === 0 && codeIcons.length !== 0){
        for(var r = 0; r < 20; r++){
          codeIcons[r].destroy();
        }
        codeIcons = [];
      }
      
      //add to the code
      myCode.push(key);
      playerGame.animations.play(key);
      
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
        //quit.visible = true;
        turn = "end"
        this.restartTime();
      }
      index++;
      
      if(index == keyCode.length && turn == "player"){
        result.frame = 0;
        result.visible = true;
        turn = "clear"
        check.visible = true;
        quit.visible = false;
        //this.game.time.events.repeat(Phaser.Timer.SECOND * 3, keyCode.length, function(){this.newSeq();turn = "game";}, this);
      }
    }
  },
  nextStage: function(){
    if(turn == "clear"){
      index = 0;
      this.newSeq();
      check.visible = false;
      quit.visible = false;
      patternInd = 0;
      turn = "game";
      this.restartTime();
      patternInd = 0;
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
    score = parseInt(keyCode.length - 1);
    this.game.state.start("GameOver", true, false, score, "hard");
  }
}