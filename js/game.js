var codeGame = function(game){
  keyCode = [];
  score = 0;
  curKey = null;
  codeTxt = null;
  code = null;
  
  pick = null;
  keys = ["up", "down", "left", "right", "A", "B", "X", "Y"];
};
codeGame.prototype = {
  create: function(){
    pick = Math.floor(Math.random() * 8);
    code = keys[pick];
    
    var background = this.game.add.sprite(0,0, 'background');

    var style = {font: 'bold 8pt Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 160, wordWrapHeight: 32};
    codeTxt = this.game.add.text(0, 0, code, style);
    
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
    code += ", " + key;
    codeTxt.setText(code);
  },
  quitGame: function(){
    this.game.state.start("GameOver");
  }
}