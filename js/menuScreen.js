var menuScreen = function(game){};

menuScreen.prototype = {
  create: function(){
    var background = this.game.add.sprite(0,0, 'background');
    
    var logo = this.game.add.sprite(0, 2, "logo");
    var playButton = this.game.add.button(48, 192, "start_btn", this.playGame, this);
    var player = this.game.add.sprite(48, 80, "player_single");
  },
  playGame: function(){
    this.game.state.start("CodeGame");
  }
};