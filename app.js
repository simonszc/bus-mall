'use strict';

//create object constructor for products, and Global allClicks counter
function Product(productName, filePath) {
  this.productName = productName;
  this.filePath = filePath;
  this.timesClicked = 0;
  this.timesDisplayed = 0;
}
Product.prototype.findPercentClicked = function() {
  return (this.timesClicked / this.timesDisplayed).toFixed(2) * 100;
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

//Initialize LS
var chartData = localStorage.getItem('dataPersist');
if (chartData) {
  allProducts = JSON.parse(chartData);
} else {
  console.log('Local storage empty! Initializing!');
  localStorage.setItem('dataPersist', JSON.stringify(allProducts));
}

//Display 3 Random, Unique Products for customer on page load. Create a function declaration, then call it.
var displayedProductLeft, displayedProductCenter, displayedProductRight;
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
  localStorage.setItem('dataPersist', JSON.stringify(allProducts));
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
  if (totalClicks  < 15) {
    console.log("totalClicks is: " + totalClicks);
    resultsButton.style.display = 'none';
  }
  else {
    resultsButton.style.display = 'block';
  }
}

//event listener and handler for button
resultsButton.addEventListener('click', handleButtonClick);

//Clear LS button

var clearLS = document.getElementById('clearLS');
var handleLSClear = function() {
  console.log('Clearing Local Storage');
  localStorage.clear();
};

clearLS.addEventListener('click', handleLSClear);

function renderList() {
  resultsDisplay.textContent = '';
  var errorMessage = document.createElement('p');
  errorMessage.textContent = 'You can click "Display Updated Results" to render this in a chart once all ' + allProducts.length + ' products have been displayed at least once (you will have to click an item one last time once your final item appears before updating as well). Thus far, ' + alreadyDisplayed.length + ' products have been displayed.';
  resultsDisplay.appendChild(errorMessage);
  var displayList = document.createElement('ul');
  for (var i = 0; i < allProducts.length; i++) {
    allProducts[i].findPercentClicked();
    var productResults = document.createElement('li');
    productResults.textContent = allProducts[i].productName + ' has receieved ' + allProducts[i].timesClicked + ' clicks after being displayed ' + allProducts[i].timesDisplayed + ' times, for a ' + allProducts[i].findPercentClicked() + '% selection rate';
    displayList.appendChild(productResults);
  }
  resultsDisplay.appendChild(displayList);
}

function createRawClicksChart() {
  var rawBarData = {
    labels : [],
    datasets : [
      {
        fillColor : "#B1FFFF",
        strokeColor : "black",
        data : []
      },
      {
        fillColor: '#0E00C4',
        strokeColor: 'black',
        data: []
      }
    ]
  }
  for (var i=0; i<allProducts.length; i++) {
    rawBarData.labels.push(allProducts[i].productName);
    rawBarData.datasets[0].data.push(allProducts[i].timesClicked);
    rawBarData.datasets[1].data.push(allProducts[i].timesDisplayed);
  }
  var rawResults = document.getElementById("rawResultsChart").getContext("2d");
  new Chart(rawResults).Bar(rawBarData);
}
function createPercentClickedChart() {
  var percentBarData = {
    labels: [],
    datasets: [
      {
        fillColor: '#B1FFFF',
        strokeColor: 'black',
        data: []
      },
    ]
  }
  for (var i = 0; i < allProducts.length; i ++) {
    percentBarData.labels.push(allProducts[i].productName);
    percentBarData.datasets[0].data.push(allProducts[i].findPercentClicked());
  }
  var percentResults = document.getElementById('percentResultsChart').getContext('2d');
  new Chart(percentResults).Bar(percentBarData);
}
function handleButtonClick(event) {
  if (alreadyDisplayed.length<14) {
    resultsButton.textContent = 'Display Updated Results';
    var resultsDisplay = document.getElementById('resultsDisplay');
    renderList();
  } else {
    resultsButton.textContent = 'Display Updated Results';
    var resultsDisplay = document.getElementById('resultsDisplay');
    resultsDisplay.textContent = 'Left chart displays # of times each item was picked by user AND # of times user was shown each item. Right chart displays the % of the time the user chose each item (times it was clicked/times user was shown item)';
    createRawClicksChart();
    createPercentClickedChart();
  }
}

//chart stuff
