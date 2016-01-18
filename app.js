//create object constructor for products, and Global allClicks counter
function Product(productName, filePath) {
  this.productName = productName;
  this.filePath = filePath;
  this.timesClicked = 0;
}
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
function displayProduct () {
  var chosenProductLeft = Math.floor(Math.random()*allProducts.length);
  document.getElementById('displayLeft').innerHTML = '<img src = "img/' + allProducts[chosenProductLeft].filePath + '">';
  var chosenProductCenter = Math.floor(Math.random()*allProducts.length);
  while (chosenProductCenter ===chosenProductLeft) {
    chosenProductCenter = Math.floor(Math.random()*allProducts.length);
  }
  document.getElementById('displayCenter').innerHTML = '<img src = "img/' + allProducts[chosenProductCenter].filePath + '">';
  var chosenProductRight = Math.floor(Math.random()*allProducts.length);
  while (chosenProductRight === chosenProductLeft || chosenProductRight ===chosenProductCenter) {
    chosenProductRight = Math.floor(Math.random()*allProducts.length);
  }
  document.getElementById('displayRight').innerHTML = '<img src = "img/' + allProducts[chosenProductRight].filePath + '">';
}
displayProduct();

//Event Listeners for all three displays

//Event handlers for all three displays. Should increment counter for clicked product, and display three new random, unique products

//if allClicks => 15, button is not hidden.
