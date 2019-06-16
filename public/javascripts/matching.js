(function() {
  'use strict';

  function Start() {}
  function Game() {}
  function Final() {}

  var TILE_SIZE = 130;

  var cards = [];
  var images = [];
  
  var firstClick, secondClick;
  var noMatch, clickTime;
  var score = 100;
  var destroyTime=0;

  Start.prototype = {
    preload: function() {
    this.load.image('nextButton', '/assets/button_green.png');   
    this.load.image('prevButton', '/assets/button_orange.png');   
    },

    create: function () { 
    // botao REINICIAR
      var restartButton = this.game.add.sprite(300, 300, 'nextButton');
      var restartLabel = this.game.add.text(300, 300, 'Start', {
          fontFamily: 'sans-serif',
          fontSize: '24px',
          color: '#000'
      });

      var restartButton1 = this.game.add.sprite(300, 250, 'prevButton');
      var restartLabel1 = this.game.add.text(300, 250, 'Home Page', {
          fontFamily: 'sans-serif',
          fontSize: '24px',
          color: '#000'
      });

      // faz botao REINICIAR ficar interativo
      restartButton.inputEnabled = true;
      restartButton.events.onInputDown.add(this.doClick);
      restartButton1.inputEnabled = true;
      restartButton1.events.onInputDown.add(this.doClick1);
    },
    
    doClick: function (sprite) {
      game.state.add('game', Game);
      game.state.start('game');
    },
    doClick1: function (sprite) {
      location.href = "/";
    },
    
    update: function () {
    },

    render: function() {
      this.game.debug.text('Alibaba Matching Game', 300, 100);
    }
  };
  Game.prototype = {
    preload: function() {      
      this.load.image('back', '/assets/game/back.png');
      this.load.image('0', '/assets/game/0.png');
      this.load.image('1', '/assets/game/1.png');
      this.load.image('2', '/assets/game/2.png');
      this.load.image('3', '/assets/game/3.png');
      this.load.image('4', '/assets/game/4.png');
      this.load.image('5', '/assets/game/5.png');
      this.load.image('6', '/assets/game/6.png');
      this.load.image('7', '/assets/game/7.png');
      this.load.image('8', '/assets/game/8.png');
      this.load.image('9', '/assets/game/9.png');
    },

    create: function () {      
      for (var i = 0; i < 10; i++) {
        images.push(this.game.add.sprite(0,0,''+i));
        images.push(this.game.add.sprite(0,0,''+i));
      }
      
      this.shuffle(images);

      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 5; j++) {
          var idx = i*5+j;
          cards[idx] = this.game.add.sprite(j*TILE_SIZE,i*TILE_SIZE,'back');
          cards[idx].index = idx;
          images[idx].x = j*TILE_SIZE;
          images[idx].y = i*TILE_SIZE;
          images[idx].visible = false;

          cards[idx].inputEnabled = true;
          cards[idx].events.onInputDown.add(this.doClick);
          cards[idx].events.onInputOver.add(function(sprite) { sprite.alpha = 0.5; });
          cards[idx].events.onInputOut.add(function(sprite) { sprite.alpha = 1.0; });
        }
      }      
    },

    doClick: function (sprite) {
      if (firstClick == null) {
        firstClick = sprite.index;
      }
      else if (secondClick == null) {
        secondClick = sprite.index;
        if (images[firstClick].key === images[secondClick].key) {
          // we have a match
          score += 50;
          cards[secondClick].destroy();
          cards[firstClick].destroy();
          images[secondClick].destroy();
          images[firstClick].destroy();
          firstClick = null; secondClick = null;
          destroyTime+=1;
          if(destroyTime==10){
            game.state.add('final', Final);
            game.state.start('final');
          }
          return;
        }
        else {
          // no match
          score -= 5;
          noMatch = true;         
        }
      }
      else {
        return; // don't allow a third click, instead wait for the update loop to flip back after 0.5 seconds
      }
      sprite.visible = false;
      images[sprite.index].visible = true; 
      clickTime = sprite.game.time.totalElapsedSeconds();
    },

    update: function () {
      if (noMatch) {
        if (this.game.time.totalElapsedSeconds() - clickTime > 0.5) {
          noMatch = false;
          cards[firstClick].visible = true;
          cards[secondClick].visible = true;
          images[firstClick].visible = false;
          images[secondClick].visible = false;
          firstClick = null; secondClick = null;
        }
      }
    },

    render: function() {
      this.game.debug.text('Score: ' + score, 660, 20);
    },

    shuffle: function(o) {
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;      
    }
  };
  Final.prototype = {
    preload: function() {
    this.load.image('nextButton', '/assets/button_green.png');  
    this.load.image('prevButton', '/assets/button_orange.png');        
    },

    create: function () { 
    // botao REINICIAR
      var restartButton = this.game.add.sprite(300, 300, 'nextButton');
      var restartLabel = this.game.add.text(300, 300, 'Back Homepage', {
          fontFamily: 'sans-serif',
          fontSize: '24px',
          color: '#000'
      });

      var restartButton1 = this.game.add.sprite(300, 250, 'prevButton');
      var restartLabel1 = this.game.add.text(300, 250, 'Restart', {
          fontFamily: 'sans-serif',
          fontSize: '24px',
          color: '#000'
      });

      // faz botao REINICIAR ficar interativo
      restartButton.inputEnabled = true;
      restartButton.events.onInputDown.add(this.doClick);
      restartButton1.inputEnabled = true;
      restartButton1.events.onInputDown.add(this.doClick1);
    },
    
    doClick: function (sprite) {
      location.href = "/";
    },
    doClick1: function (sprite) {
      location.href = "matching.ejs";
    },
    
    update: function () {
    },

    render: function() {
      this.game.debug.text('Finish!!!', 300, 100);
      this.game.debug.text('Your Score: ' + score, 300, 120);
    }
  };

  var game = new Phaser.Game(800, 520, Phaser.AUTO, 'pairs-game');
  game.state.add('start', Start);
  game.state.start('start');

}());