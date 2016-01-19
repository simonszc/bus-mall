'use strict';

//create object constructor for products, and Global allClicks counter
function Product(productName, filePath) {
  this.productName = productName;
  this.filePath = filePath;
  this.timesClicked = 0;
  this.timesDisplayed = 0;
  this.findPercentClicked = function() {
    return (this.timesClicked / this.timesDisplayed).toFixed(2) * 100;
  }
}

var totalClicks = 0;
//Place all 15 product objects into an array
var allProducts = [new Product('bag', 'bag.jpg'),
                  new Product('banana', 'banana.jpg'),
                  new Product('boots', 'boots.jpg'),
                  new Product('chair', 'chair.jpg'),
                  new Product('cthulu', 'cthulhu.jpg'),
                  new Product('dragon', 'dragon.jpg'),
                  new Product('pen', 'pen.jpg'),
                  new Product('scissors', 'scissors.jpg'),
                  new Product('shark', 'shark.jpg'),
                  new Product('sweep', 'sweep.jpg'),
                  new Product('unicorn', 'unicorn.jpg'),
                  new Product('usb', 'usb.jpg'),
                  new Product('water-can', 'water-can.jpg'),
                  new Product('winer-glass', 'wine-glass.jpg')];
var alreadyDisplayed = [];

//Display 3 Random, Unique Products for customer on page load. Create a function declaration, then call it.
var displayedProductLeft = 0;
var displayedProductCenter = 0;
var displayedProductRight = 0;
var displayLeft = document.getElementById('displayLeft');
var displayCenter = document.getElementById('displayCenter');
var displayRight = document.getElementById('displayRight');

function displayProduct () {
  displayedProductLeft = Math.floor(Math.random()*allProducts.length);
  displayLeft.innerHTML = '<img src = "img/' + allProducts[displayedProductLeft].filePath + '">';

  displayedProductCenter = Math.floor(Math.random()*allProducts.length);
  while (displayedProductCenter === displayedProductLeft) {
    displayedProductCenter = Math.floor(Math.random()*allProducts.length);
  }
  displayCenter.innerHTML = '<img src = "img/' + allProducts[displayedProductCenter].filePath + '">';

  displayedProductRight = Math.floor(Math.random()*allProducts.length);
  while (displayedProductRight === displayedProductLeft || displayedProductRight === displayedProductCenter) {
    displayedProductRight = Math.floor(Math.random()*allProducts.length);
  }
  displayRight.innerHTML = '<img src = "img/' + allProducts[displayedProductRight].filePath + '">';
}

displayProduct();

//Event Listeners for all three displays

displayLeft.addEventListener('click', handleClickLeft);
displayCenter.addEventListener('click', handleClickCenter);
displayRight.addEventListener('click', handleClickRight);

//Event handlers for all three displays. Should increment counter for clicked product, and display three new random, unique products

function genericClickMethods() {
  console.log(event);
  totalClicks +=1;
  allProducts[displayedProductLeft].timesDisplayed +=1;
  allProducts[displayedProductCenter].timesDisplayed +=1;
  allProducts[displayedProductRight].timesDisplayed +=1;
  if (alreadyDisplayed.indexOf(displayedProductLeft) === -1) {
    alreadyDisplayed.push(displayedProductLeft);
  }
  if (alreadyDisplayed.indexOf(displayedProductCenter) === -1) {
    alreadyDisplayed.push(displayedProductCenter);
  }
  if (alreadyDisplayed.indexOf(displayedProductRight) === -1) {
    alreadyDisplayed.push(displayedProductRight);
  }
  checkForButton();
  displayProduct();
}
function handleClickLeft(event) {
  allProducts[displayedProductLeft].timesClicked += 1;
  genericClickMethods();
}

function handleClickCenter(event) {
  allProducts[displayedProductCenter].timesClicked +=1;
  genericClickMethods();
}

function handleClickRight(event) {
  allProducts[displayedProductRight].timesClicked +=1;
  genericClickMethods();
}
//if allClicks => 15, button is not hidden.
var resultsButton = document.getElementById('resultsButton');
checkForButton();
function checkForButton () {
  if (totalClicks  < 15 || alreadyDisplayed.length < 14) {
    console.log("totalClicks is: " + totalClicks);
    resultsButton.style.display = 'none';
  }
  else {
    resultsButton.style.display = 'block';
  }
}

//event listener and handler for button
resultsButton.addEventListener('click', handleButtonClick);

function handleButtonClick(event) {
  resultsButton.textContent = 'Display Updated Results';
  var barData = {
  	labels : [],
  	datasets : [
  		{
  			fillColor : "#B1FFFF",
  			strokeColor : "black",
  			data : []
  		},
  	]
  }
  for (var i=0; i<allProducts.length; i++) {
    barData.labels.push(allProducts[i].productName);
    barData.datasets[0].data.push(allProducts[i].findPercentClicked());
  }


  var results = document.getElementById("resultsChart").getContext("2d");
  new Chart(results).Bar(barData);
}

//chart stuff
