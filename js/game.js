var codeGame = function(game){
  keyCode = [];
  score = 0;
  curKey = null;
  codeTxt = null;
  code = null;
  
  pick = null;
  keys = ["up", "down", "left", "right", "A", "B", "X", "Y"];
  
  myCode = [];
  codeIcons = null;
};
codeGame.prototype = {
  create: function(){
    pick = Math.floor(Math.random() * 8);
    code = keys[pick];
    
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
    
    var quit = this.game.add.button(48, 200, "quit", this.quitGame, this);
    
  },
  randomKey: function(){
    pick = Math.floor(Math.random() * 8);
    curKey = keys[pick];
  },
  presskey: function(key){
    //if overflowing
    if(myCode.length % 20 == 0 && codeIcons.length == 20){
      for(var i = 0; i < 20; i++){
        codeIcons[i].destroy();
      }
    }
    
    //add to the code
    myCode.push(key);
    
    //make the visual icons
    var col = (myCode.length - 1) % 10;
    var row = Math.floor((myCode.length - 1) / 10) % 2;
    var keyIcon = this.game.add.sprite(16 * col, 16 * row, key);
    keyIcon.scale.setTo(0.5,0.5);
    codeIcons.push(keyIcon);
  },
  quitGame: function(){
    this.game.state.start("GameOver");
  }
}