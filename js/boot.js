var boot = function(game){
  console.log("%cStarting CHEAT CODE", "color:white; background:red");
};

boot.prototype = {
  preload: function(){
    this.game.load.image("loading", "assets/loadBar.png");
  },
  create: function(){
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);
    this.game.state.start("Preload");
  }
};