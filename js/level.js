
// Mostly used in fist attempt to replication the original lemming.

// Grid creation
// Level Size 1000x5000

var Tile = function(size, x, y, id) {

  this.container = document.createElement('div');
  //  this.numero = document.createElement('p');
  this.container.setAttribute('id', 'grid' + id);
  this.container.style.left = x+'px';
  this.container.style.top = y+'px';
  this.container.style.width = size+"px";
  this.container.style.height = size+"px";
  this.container.style.position = "absolute";
  this.container.style.zIndex = "97";
    // this.numero.innerHTML = 'id:'+id;  //, x:'+x+', y:'+y
  this.container.diggable = true;
  this.container.isEnd = false;
  this.container.rebound = false;
  var gameZone = document.getElementById('gameZone')
  // this.container.appendChild(this.numero);
  gameZone.appendChild(this.container);
  // this.container.style.border = '1px solid red';
  this.x = x;
  this.y = y;
  this.width= size;
  this.height = size;


};

Tile.prototype.getBoundaries = function () {
  return {
    left : this.x,
    top : this.y,
    right: this.x + this.width,
    bottom: this.y + this.height,
    head: this.y + (this.height *0.66)
  };
};


var Grid = function(maxCol,maxRow,tileSize) {
  this.maxCol = maxCol;
  this.maxRow = maxRow;
  this.tileSize = tileSize;
  this.tiles = [];
  this.reboundTiles = [];

  var j = 0,
  i = 0,
  id= 0;

  for( i=0; i<maxCol; i++){
    // console.log(ii);
    for( j=0; j<maxRow; j++){
      // console.log((taille*ii), (taille*jj));
      this.tiles.push(new Tile(tileSize, (tileSize*j), (tileSize*i), id++));
    }
  }

};

Grid.prototype.setRebound = function (indexMin,indexMax, value) {
  value = Boolean(value);
  for ( var i = indexMin; i <= indexMax; i++) {
    if (value) {
      this.reboundTiles.push(this.tiles[i]);
      this.tiles[i].container.style.backgroundImage = "url('img/floor.jpg')";
    }
    this.tiles[i].rebound = value;

  }
};

Grid.prototype.isHittingY = function (boundary) {
for ( var i = 0; i <= this.reboundTiles.length; i++){
    // console.log(boundary);
    var tile = this.reboundTiles[i];
    // console.log(this.reboundTiles[i]);
    if (tile) {
      var boundaries = tile.getBoundaries();

      if(this.isIntersectRect(boundary, boundaries)){
        return true;
      }



    }
  }
  return false;
};


Grid.prototype.isHittingX = function (boundary) {
for ( var i = 0; i <= this.reboundTiles.length; i++){
    // console.log(boundary);
    var tile = this.reboundTiles[i];
    // console.log(this.reboundTiles[i]);
    if (tile) {
      var boundaries = tile.getBoundaries();
      if(this.isIntersectYRect(boundary, boundaries)) {
        // console.log((this.isIntersectYRect(boundary, boundaries)));
        return true;
      }
    }
  }
  return false;
};





// intersection of 2 rectangles

Grid.prototype.isIntersectRect = function (rect1,rect2) {
  return (rect1.right >= rect2.left && rect1.left <= rect2.right) && (rect1.bottom >= rect2.top && rect1.top <= rect2.bottom);
};


Grid.prototype.isIntersectYRect = function (rect1,rect2) {
  // console.log('coucou');
  return (rect1.right >= rect2.left && rect1.left <= rect2.right) && (rect1.head >= rect2.top && rect1.top <= rect2.head);
  // console.log(rect1.right >= rect2.left && rect1.left <= rect2.right);
  // console.log(rect1.right +'>=' + rect2.left );
  // console.log(rect1.left +'<=' + rect2.right );

};



// var grid = new Grid (20,40,25);
// /*
// --------------------------
// ---------LEVEL 1 ---------
// --------------------------
// */
//
// grid.setRebound(364,387,true);
// grid.setRebound(404,427,true);
// grid.setRebound(444,467,true);
// grid.setRebound(384,507,true);
// grid.setRebound(642,678,true);
// grid.setRebound(324,324,true);
// grid.setRebound(347,347,true);
// grid.setRebound(602,602,true);
// grid.setRebound(631,631,true);
// grid.setRebound(638,638,true);
//
//
// grid.tiles[631].isEnd = true;
//
//  console.log(grid.tiles[631]);



// function getColRowFromPosition(x, y){
//   return {
//     col : Math.floor(x / taille),
//     row : Math.floor(y / taille),
//   };
// }
//
// function getIndiceFromPosition(x, y){
//   var pos = getColRowFromPosition(x, y);
//
//   return pos.col + pos.row * 40;
// }
//
// console.log(grid[getIndiceFromPosition(340, 40)]);
//
//
