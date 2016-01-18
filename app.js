//create object constructor for products, and Global allClicks counter
function Product(productName, filePath) {
  this.productName = productName;
  this.filePath = filePath;
  this.timesClicked = 0;
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

//Display 3 Random, Unique Products for customer on page load. Create a function declaration, then call it.
var chosenProductLeft = 0;
var chosenProductCenter = 0;
var chosenProductRight = 0;

function displayProduct () {
  chosenProductLeft = Math.floor(Math.random()*allProducts.length);
  document.getElementById('displayLeft').innerHTML = '<img src = "img/' + allProducts[chosenProductLeft].filePath + '">';
  chosenProductCenter = Math.floor(Math.random()*allProducts.length);
  while (chosenProductCenter ===chosenProductLeft) {
    chosenProductCenter = Math.floor(Math.random()*allProducts.length);
  }
  document.getElementById('displayCenter').innerHTML = '<img src = "img/' + allProducts[chosenProductCenter].filePath + '">';
  chosenProductRight = Math.floor(Math.random()*allProducts.length);
  while (chosenProductRight === chosenProductLeft || chosenProductRight ===chosenProductCenter) {
    chosenProductRight = Math.floor(Math.random()*allProducts.length);
  }
  document.getElementById('displayRight').innerHTML = '<img src = "img/' + allProducts[chosenProductRight].filePath + '">';
}

displayProduct();

//Event Listeners for all three displays
var displayLeft = document.getElementById('displayLeft');
var displayCenter = document.getElementById('displayCenter');
var displayRight = document.getElementById('displayRight');

displayLeft.addEventListener('click', handleClickLeft);
displayCenter.addEventListener('click', handleClickCenter);
displayRight.addEventListener('click', handleClickRight);

//Event handlers for all three displays. Should increment counter for clicked product, and display three new random, unique products
function handleClickLeft(event) {
  console.log(event);
  totalClicks += 1;
  allProducts[chosenProductLeft].timesClicked += 1;
  checkForButton();
  displayProduct();
}

function handleClickCenter(event) {
  console.log(event);
  totalClicks += 1;
  allProducts[chosenProductCenter].timesClicked +=1;
  checkForButton();
  displayProduct();
}

function handleClickRight(event) {
  console.log(event);
  totalClicks +=1;
  allProducts[chosenProductRight].timesClicked +=1;
  checkForButton();
  displayProduct();
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

function handleButtonClick(event) {
  resultsDisplay = document.getElementById('resultsDisplay');
  var displayList = document.createElement('ul');
  for (i = 0; i < allProducts.length; i++) {
    var productResults = document.createElement('li');
    productResults.textContent = allProducts[i].productName + ' has receieved ' + allProducts[i].timesClicked + ' clicks.';
    displayList.appendChild(productResults);
  }
  resultsDisplay.appendChild(displayList);
}
