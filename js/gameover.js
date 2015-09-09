var gameover = function(game){
  myScore = 0;
  highscore = 0;
  gamemode = null;
};
gameover.prototype = {
  init: function(score, gamemode){
    myScore = score;
    mode = gamemode;
    this.loadData();
    
    
    if(score > highscore){
      highscore = score;
      if(mode == "hard")
        localStorage.highScoreHard = Number(highscore);
      else if(mode == "medium")
        localStorage.highScoreMedium = Number(highscore);
      else if(mode == "easy")
        localStorage.highScoreEasy = Number(highscore);
    }
    
  },
  loadData: function(){
    if(typeof(Storage) !== "undefined"){
      if(mode == "hard"){
        if(localStorage.highScoreHard)
          highscore = Number(localStorage.highScoreHard);
        else
          localStorage.highScoreHard = 0;
      }else if(mode == "medium"){
        if(localStorage.highScoreMedium)
          highscore = Number(localStorage.highScoreMedium);
        else
          localStorage.highScoreMedium = 0;
      }else if(mode == "easy"){
        if(localStorage.highScoreEasy)
          highscore = Number(localStorage.highScoreEasy);
        else
          localStorage.highScoreEasy = 0;
      }
     
        
    }
  },
  create: function(){
    var background = this.game.add.sprite(0,0, "background");
    
    var gameovertext = this.game.add.sprite(0, 4, "gameover_long_logo")
    //var gameovertext = this.game.add.sprite(0, 48, "gameover_logo");
    var scores = this.game.add.sprite(0, 32, "scores");
    
    var highscoreTxt = this.game.add.text(this.game.world.centerX, 90, highscore.toString());
    highscoreTxt.anchor.set(0.5);
    highscoreTxt.align = 'center';
    highscoreTxt.font = 'monospace';
    highscoreTxt.fontSize = 16;
    highscoreTxt.fontWeight = 'bold';
    highscoreTxt.stroke = '#000000';
    highscoreTxt.strokeThickness = 6;
    highscoreTxt.fill = '#ff6a00';
    
    var scoreTxt = this.game.add.text(this.game.world.centerX, 150, myScore.toString());
    scoreTxt.anchor.set(0.5);
    scoreTxt.align = 'center';
    scoreTxt.font = 'monospace';
    scoreTxt.fontSize = 16;
    scoreTxt.fontWeight = 'bold';
    scoreTxt.stroke = '#000000';
    scoreTxt.strokeThickness = 6;
    scoreTxt.fill = '#ffd800';
    
    var menu_btn = this.game.add.button(8, 192, "menu", this.toMenu, this);
    var play_again = this.game.add.button(88, 192, "play_btn", this.playGame, this);
  
  },
  toMenu: function(){
    this.game.state.start("MenuScreen");
  },
  playGame: function(){
    this.game.state.start("CodeGame")
  }
}