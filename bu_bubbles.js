"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 14
   Case Problem 1

   Author: Hesbon Osoro
   Date: 12/11/22  
   
   Filename: bu_bubbles.js

*/

/* JavaScript Objects */

var xPos = 0;
var yPos = 0;
var xVelocity = 0;
var yVelocity = 0;
var radius = 0;
var opacity = 1;
var hue = 0;

var box = {
  width: 1024,
  height: 500,
};

function bubble(size, img) {
  this.radius = size;
  this.imageURL = img;
  this.xVelocity = null;
  this.yVelocity = null;
  this.xPos = null;
  this.yPos = null;
  this.opacity = 1;
  this.hue = 0;
  this.rotate = 0;
  this.rotateDirection = 1;
}

bubble.prototype.fadeBubble = function () {
  this.opacity -= 0.0005;
};

bubble.prototype.changeColor = function () {
  this.hue += 3;
  this.hue %= 360;
};

bubble.prototype.rotateBubble = function () {
  this.rotate += this.rotateDirection;
  this.rotate %= 360;
};

bubble.prototype.moveBubble = function (height, width) {
  var bubbleTop = this.yPos;
  var bubbleBottom = this.yPos + this.radius;
  var bubbleLeft = this.xPos;
  var bubbleRight = this.xPos + this.radius;

  if (bubbleTop < 0 || bubbleBottom > height) {
    this.yVelocity = -this.yVelocity;
  }

  if (bubbleLeft < 0 || bubbleRight > width) {
    this.xVelocity = -this.xVelocity;
  }

  this.yPos += this.yVelocity;
  this.xPos += this.xVelocity;
};

window.addEventListener("load", function () {
  // Reference to the bubble box
  var bubbleBox = document.getElementById("bubbleBox");

  // Create a new bubble every half-second
  setInterval(function () {
    // Do not create more than 20 bubbles at any one time
    if (bubbleBox.childElementCount <= 20) {
      // prettier-ignore
      var newBubble = new bubble(randInt(50, 120),'bu_bubble' + randInt(1, 10) + '.png');

      newBubble.xPos = box.width / 2;
      newBubble.yPos = box.height / 2;
      newBubble.xVelocity = randInt(-5, 5);
      newBubble.yVelocity = randInt(-5, 5);
      newBubble.rotate = randInt(0, 360);
      newBubble.hue = randInt(0, 360);
      newBubble.rotateDirection = randInt(-2, 2);

      var bubbleImg = document.createElement("img");
      bubbleImg.style.position = "absolute";

      bubbleImg.src = newBubble.imageURL;
      bubbleImg.style.width = newBubble.radius + "px";
      bubbleImg.style.left = newBubble.xPos + "px";
      bubbleImg.style.top = newBubble.yPos + "px";

      bubbleBox.appendChild(bubbleImg);

      var bubbleInterval = setInterval(function () {
        newBubble.fadeBubble();
        if (newBubble.opacity < 0) {
          bubbleBox.removeChild(bubbleImg);
          clearInterval(bubbleInterval);
        } else {
          bubbleImg.style.opacity = newBubble.opacity;
          newBubble.changeColor();
          bubbleImg.style.filter = "hue-rotate(" + newBubble.hue + "deg)";
          newBubble.rotateBubble();
          bubbleImg.style.transform = "rotate(" + newBubble.rotate + "deg)";
          newBubble.moveBubble(box.height, box.width);
          bubbleImg.style.top = newBubble.yPos + "px";
          bubbleImg.style.left = newBubble.xPos + "px";
        }
      }, 25);
    }
  }, 500);

  /* Function to return a random integer between minVal and maxValue inclusive */
  function randInt(minVal, maxVal) {
    var size = maxVal - minVal + 1;
    return Math.floor(minVal + size * Math.random());
  }
});
