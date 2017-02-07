// Lemmings creation

var Lemming = function(x,y,id, grid,lemBoat) {
  this.id = id;
  this.container = document.createElement('div');
  this.lemming = document.createElement('img');
  this.container.setAttribute('id', 'container' + id);
  this.lemming.setAttribute('id', 'player' + id);
  this.lemming.setAttribute('class', 'player');
  this.container.appendChild(this.lemming);
  this.parentChild = document.getElementById('parent');
  this.parentChild.appendChild(this.container);
  this.container.style.width ="20px";
  this.container.style.height ="30px";
  // this.container.style.border= "1px solid green";
  this.lemming.style.top ="591px";
  this.lemming.style.left ="423px";
  this.lemming.src = 'lemming-sprite.png';
  this.lemming.style.position = "absolute";
  this.container.style.position = "absolute";
  this.container.style.overflow = "hidden";
  this.lemming.style.transform = "scale(3, 3)";
  this.container.style.transform = "scale(1, 1)";  // annimation dans l'autre sens scale(-1, 1)
  this.container.direction = 'left';   // checker la direction left-right
  this.container.style.left = x + 'px';
  this.container.style.top = y + 'px';
  this.x = x ;
  this.y = y ;
  this.currentAnimation = 'fall';
  this.indexAnnimation;
  this.animationTimeout;
  this.movementTimeout;
  this.grid = grid;
  this.lemmingBoat = lemBoat;
  this.state = 'fallState';
};

// fuction reverseScale to switch animation way left right

Lemming.prototype.reverseScale = function() {
  if (this.container.style.transform == "scale(1, 1)") {
    this.container.style.transform = "scale(-1,1)";
  } else {
      this.container.style.transform = "scale(1, 1)";
  }
};


// Animation of the lemmings based on sprite actions

Lemming.prototype.animating = function(index, spriteAction, loop){
 this.currentAnimation = spriteAction;
 this.indexAnnimation = index;

 this.container.style.width = spriteAction[index].size.width + 'px';
 this.container.style.height = spriteAction[index].size.height + 'px';
 this.lemming.style.left = spriteAction[index].sprite.left + 'px';
 this.lemming.style.top = spriteAction[index].sprite.top + 'px';
 clearTimeout(this.animationTimeout);



  this.animationTimeout = window.setTimeout(function(){
   if(spriteAction[index+1]){
     this.animating(index + 1, spriteAction, loop);
   }else{
     if (loop) {
       this.animating(0, spriteAction,loop);
     }
   }
}.bind(this), 200);
};


Lemming.prototype.fallingUmbrella = function(index, spriteAction){
  this.currentAnimation = spriteAction;
  this.indexAnnimation = index;
  this.container.style.width = spriteAction[index].size.width;
  this.container.style.height = spriteAction[index].size.height;

  this.lemming.style.left = spriteAction[index].sprite.left;
  this.lemming.style.top = spriteAction[index].sprite.top;
  clearTimeout(this.animationTimeout);

  this.animationTimeout = window.setTimeout(function(){
    if(spriteAction[index+1]){
      Lemming.prototype.fallingUmbrella(index + 1);
    }else{
      Lemming.prototype.fallingUmbrella(0);
    }
  }.bind(this), 300);
};

Lemming.prototype.deployingUmbrella = function(index,spriteAction){
  this.currentAnimation = spriteAction;
  this.indexAnnimation = index;
  this.container.style.width = spriteAction[index].size.width;
  this.container.style.height = spriteAction[index].size.height;

  this.lemming.style.left = spriteAction[index].sprite.left;
  this.lemming.style.top = spriteAction[index].sprite.top;
  clearTimeout(this.animationTimeout);

  this.animationTimeout = window.setTimeout(function(){
    if(spriteAction[index+1]){
      Lemming.prototype.deployingUmbrella(index + 1 ,spriteAction);
    }else{
      Lemming.prototype.fallingUmbrella(0 ,umbrella);
    }
  }.bind(this), 300);
};

// lemmings movement

Lemming.prototype.movement = function(x,y) {
  // clearTimeout(this.movementTimeout);
  var index = this.indexAnnimation;
  this.stopMovement();

  this.x += x;
  this.y += y;

  this.moveX = x;
  this.moveY = y;


  this.movementTimeout = setTimeout(function () {
    this.container.style.left = this.x + 'px';
    this.container.style.top = this.y + 'px';
    var lemmingBoundaries = this.getBoundaries();


    var hitX = this.grid.isHittingX(lemmingBoundaries);
    var hitY = this.grid.isHittingY(lemmingBoundaries);

    var hitBoat = this.lemmingBoat.isHittingBoat(lemmingBoundaries);

    var lemingElement = document.getElementById(('container' + this.id));
    // console.log(this.container.style.top);
    var position = parseFloat(this.container.style.top);
    if(position >= 525){
      lemingElement.remove();
      ColisionSound('fail');

    }

      if (hitBoat && lemingElement ){
        this.stopMovement();
        this.animateFromState('hitBoat');
        ColisionSound('win');
        lemingElement.remove();
        lemmingBoundaries = this.getBoundaries();

      }

    if (hitY ===  true) {

      if (hitX === false) {
        this.animateFromState(this.state);
        if (this.state == 'fallState'|| this.state == 'umbrellaState') {
          this.movement(3,0);
          this.animateFromState('walkingStateRight');
        }else {
          if (this.state == 'walkingStateRight') {
            this.movement(3,0);
          }
          if (this.state == 'walkingStateLeft') {
            this.movement(-3,0);
          }
        }

      } else {
        if (hitX===true) {

          if (this.state == 'walkingStateRight') {
            this.movement((-3),0);
            this.animateFromState("walkingStateLeft");

          } else {
            this.animateFromState("walkingStateRight");
            this.movement(3,0);
          }
        }
      }
    } else {

      if (this.state == 'umbrellaState') {
        this.animateFromState('umbrellaState');
        this.movement(0,2);
      } else {
        this.animateFromState('fallState');
        this.movement(0,5);

      }
    }
  }.bind(this), 50);

};

// check colisions

Lemming.prototype.isIntersectRect = function (rect1,rect2) {
  return (rect1.right >= rect2.left && rect1.left <= rect2.right) && (rect1.bottom >= rect2.top && rect1.top <= rect2.bottom);
};

Lemming.prototype.stopMovement = function(x,y) {
  clearTimeout(this.movementTimeout);

};

//boundaries for colisions

Lemming.prototype.getBoundaries = function () {
  var annimation = this.currentAnimation[this.indexAnnimation];

  return {
    left : this.x,
    top : this.y,
    right: this.x + (annimation.size.width+this.moveX),
    bottom: this.y + (annimation.size.height),
    head: this.y + (annimation.size.height*0.5 +1)
  };
};

//handeling state to keep animation smooth

Lemming.prototype.animateFromState = function (state) {
    if (state != this.state){

      this.state = state ;
      if (this.state == 'walkingStateRight'){
        this.container.style.transform = "scale(1,1)";
        this.animating(0,walk,true);
      }
      if (this.state == 'walkingStateLeft'){
        this.container.style.transform = "scale(-1,1)";
        this.animating(0,walk,true);
      }
      if (state == 'fallState'){
        this.animating(0,fall,true);
      }
      if (state == 'stopState'){
        this.animating(0,stop,true);
        this.movement(0,0);
      }
      if (state == 'endState'){
        this.animating(0,finish,false);
      }
      if (state == 'killState'){
        this.movement(0,0);
        this.animating(0,kill,false);
      }
      if (state == 'umbrellaState'){
        this.fallingUmbrella(0,umbrella);
      }
      if (state == 'hitBoat'){
        var score = parseFloat(document.getElementById('score').innerHTML);
        score = score + 1 ;
        if (score == 15) {
          var displayWin = document.getElementById('win');
          displayWin.style.display = "block";
        }
        document.getElementById('score').innerHTML = score;
      }
    }
};
