var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = 0;
var y = 0;
var dx = 2;
var dy = 2;

var scale = 0.3;
var imageDir = "franks/";
var frankNo = 0;

// Dynamic canvas size
window.addEventListener("resize", () => {
  // Threshold for resizing to improve performance
  if(Math.abs(canvas.height + canvas.width - (window.innerHeight + window.innerWidth)) > 20) {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  }
})

// Pre-load images and store in an img array
function loadImages(directory) {
  // array containing references to images
  var franks = []
  for (i = 1; i <= 32; i++) {
    var img = new Image();
    // Assumes image names are just a number with .jpg extension
    img.src = directory + i + ".jpg";
    franks[i - 1] = img;
  }
  return franks;
}

function drawFrank(imgArray) {
  var img = imgArray[frankNo];
  ctx.drawImage(img, x, y, img.width / img.height * scale * canvas.width, scale * canvas.width);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = frankNo==29 ? "black" : "#FEB801"
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawFrank(imageArray);
  x += dx;
  y += dy;
  horzOverlap = 0.75;
  vertOverlap = 0.9;
  imgWidth = imageArray[0].width / imageArray[0].height * scale * canvas.width;
  imgHeight = scale * canvas.width;
  
  // Right canvas edge collision
  if(x + dx + imgWidth * horzOverlap > canvas.width) {
    dx = -1 * Math.abs(dx);
    frankNo++;
    if(frankNo >= 32) {
      frankNo = 0;
    }
  }
  // Left canvas edge collision
  else if(x + dx + imgWidth * (1-horzOverlap) < 0){
    dx = Math.abs(dx);
    frankNo++;
    if(frankNo >= 32) {
      frankNo = 0;
    }
  }
  // Bottom canvas edge collision
  if(y + dy + imgHeight * vertOverlap > canvas.height) {
    dy = -1 * Math.abs(dy);
    frankNo++;
    if(frankNo >= 32) {
      frankNo = 0;
    }
  }
  // Top canvas edge collision
  else if(y + dy + imgHeight * (1-vertOverlap) < 0) {
    dy = Math.abs(dy);
    frankNo++;
    if(frankNo >= 32) {
      frankNo = 0;
    }

  }
  requestAnimationFrame(draw);
}

var imageArray = loadImages(imageDir);
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
draw();
