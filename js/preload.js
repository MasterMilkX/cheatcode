var preload = function(game){};

preload.prototype = {
  preload: function(){
      //loading bar
      var loadingBar = this.add.sprite(80, 128, "loading");
      loadingBar.anchor.setTo(0.5,0.5);
      this.load.setPreloadSprite(loadingBar);
    //menu screen
    this.game.load.image("player_single", "assets/sprite_single.png");
    this.game.load.image("logo", "assets/logo.png");
    this.game.load.image("start_btn", "assets/start.png");
    this.game.load.image("background", "assets/title_background.png");
    
    //game screen
    this.game.load.spritesheet("player", "assets/sprite.png", 64, 64, 12);
    this.game.load.image("quit", "assets/quit_btn.png");
    this.game.load.image("up", "assets/up.png");
    this.game.load.image("down", "assets/down.png");
    this.game.load.image("left", "assets/left.png");
    this.game.load.image("right", "assets/right.png");
    this.game.load.image("A", "assets/A.png");
    this.game.load.image("B", "assets/B.png");
    this.game.load.image("X", "assets/X.png");
    this.game.load.image("Y", "assets/Y.png");
    
    this.game.load.image("check", 'assets/check.png');
    this.game.load.spritesheet("win-lose", "assets/win-lose.png", 128, 128, 2);
    
    //game over
    this.game.load.image("gameover_logo", "assets/gameover2.png");
    this.game.load.image("gameover_long_logo", "assets/gameover_long.png");
    this.game.load.image("menu", "assets/menu.png");
    this.game.load.image("play_btn", "assets/play.png");
    this.game.load.image("score", "assets/score_screen.png");
    
  },
  create: function(){
    this.game.state.start("MenuScreen");
  }
};