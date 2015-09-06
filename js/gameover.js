var gameover = function(game){
  
};
gameover.prototype = {
  create: function(){
    var background = this.game.add.sprite(0,0, "background");
    var gameovertext = this.game.add.sprite(0, 48, "gameover_logo");
    var menu_btn = this.game.add.button(48, 148, "menu", this.toMenu, this);
    var play_again = this.game.add.button(48, 192, "play_btn", this.playGame, this);
  },
  toMenu: function(){
    this.game.state.start("MenuScreen");
  },
  playGame: function(){
    this.game.state.start("CodeGame")
  }
}