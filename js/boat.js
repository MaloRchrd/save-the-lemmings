var Boat = function(x,y,id) {
  this.id = id;
  this.container = document.createElement('div');
  this.boat = document.createElement('img');
  this.container.setAttribute('id', 'boatContainer' + id);
  this.container.setAttribute('class', 'boatContainer');
  this.container.style.transform = "scale(0.8, 0.8)";
  this.boat.setAttribute('id', 'boat' + id);
  this.boat.setAttribute('class', 'boat');
  this.container.appendChild(this.boat);
  this.parentChild = document.getElementById('parent');
  this.parentChild.appendChild(this.container);
  this.container.style.height ="31px";
  this.container.style.width ="75px";
  // this.container.style.border= "1px solid green";
  this.boat.style.top ="-438px";
  this.boat.style.left ="89px";
  this.boat.src = 'img/newlemmingssprite3.png';
  this.boat.style.position = "absolute";
  this.container.style.position = "absolute";
  this.container.style.overflow = "hidden";
  this.boat.style.transform = "scale(3, 3)";
  this.container.style.transform = "scale(1, 1)";  // annimation dans l'autre sens scale(-1, 1)
  this.container.direction = 'left';   // checker la direction left-right
  this.container.style.left = x + 'px';
  this.container.style.top = y + 'px';
  this.x = x ;
  this.y = y ;
  this.state = "";
  this.movementTimeout;
  this.currentAnimation = 'boat1';
  this.indexAnnimation = 0;
};


Boat.prototype.animating = function(index, spriteAction, loop){
 this.currentAnimation = spriteAction;
 this.indexAnnimation = index;
 // console.log(this.indexAnnimation);

 this.container.style.width = spriteAction[index].size.width + 'px';
 this.container.style.height = spriteAction[index].size.height + 'px';
 this.boat.style.left = spriteAction[index].sprite.left + 'px';
 this.boat.style.top = spriteAction[index].sprite.top + 'px';
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

Boat.prototype.stopAnimating = function (spriteAction,index) {
  clearTimeout(this.animationTimeout);
  this.container.style.width = spriteAction[index].size.width + 'px';
  this.container.style.height = spriteAction[index].size.height + 'px';
  this.boat.style.left = spriteAction[index].sprite.left + 'px';
  this.boat.style.top = spriteAction[index].sprite.top + 'px';

};

Boat.prototype.movementLeft = function(x) {
 clearTimeout(this.movementTimeout);
    this.movementTimeout = setInterval(function () {
    var boatPosition = parseFloat(this.container.style.left);
    if (boatPosition > 0){
      var newPosition = boatPosition + x;
      this.container.style.left = newPosition + 'px';
    }

  }.bind(this), 10);


};

Boat.prototype.movementRight = function(x) {
 clearTimeout(this.movementTimeout);
    this.movementTimeout = setInterval(function () {
    var boatPosition = parseFloat(this.container.style.left);
      if (boatPosition < 1017){
        this.x = boatPosition;
        var newPosition = boatPosition + x;
        this.container.style.left = newPosition + 'px';
      }
  }.bind(this), 10);


};

Boat.prototype.stopMovement = function(x) {
 clearTimeout(this.movementTimeout);
};


Boat.prototype.getBoundaries = function () {
  // var annimation = this.currentAnimation[this.indexAnnimation];
  //   console.log( );
  //   console.log(annimation);
  return {
    left : this.x,
    top : this.y,
    right: this.x + (boat1[0].size.width),
    bottom: this.y + (boat1[0].size.height),
  };
};


Boat.prototype.isIntersectRect = function (rect1,rect2) {
  return (rect1.right >= rect2.left && rect1.left <= rect2.right) && (rect1.bottom >= rect2.top && rect1.top <= rect2.bottom);
};


Boat.prototype.isHittingBoat = function (boundary) {

    var boatBoundaries = this.getBoundaries();
    if (boatBoundaries) {
      if(this.isIntersectRect(boundary, boatBoundaries)){
        return true;
      }
    }
  return false;
};

Boat.prototype.animateFromState = function (state) {
    if (state != this.state){

      this.state = state ;
      if (this.state == 'moveRight'){
        this.container.style.transform = "scale(1,1)";
        this.movementRight(3);
        this.animating(0,boat2,true);
        // console.log(this.getBoundaries());

      }
      if (this.state == 'moveLeft'){
        this.container.style.transform = "scale(-1,1)";
        this.movementLeft(-3);
        this.animating(0,boat2,true);
      }
      if (this.state == 'stop'){
        this.stopAnimating(boat2,1);
        this.movementLeft(0);

      }
    }
};
