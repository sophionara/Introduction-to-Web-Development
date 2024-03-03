// to execute JavaScript code that relies on DOM elements being available without blocking the initial page load.
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else {
    ready()
}
function ready(){
    // select all REMOVE BUTTONS and activate removeCartItem function on them
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    //  to attach event listeners to quantity input fields in a shopping cart. 
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    // ADD TO CART BUTTON
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    // PURCHASE BUTTON
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
   
}
function purchaseClicked(){
    alert("Thank you for your purchase! <3")
    var cartItems = document.getElementsByClassName("cart-items")[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
    
}

function removeCartItem(event) {
    var buttonClicked = event.target
    // it moves up two levels in the DOM hierarchy to find the container element of the item, and then removes it from the DOM entirely.
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
function quantityChanged(event){
    // This line retrieves the element that triggered the event. 
    var input = event.target
    // if the value entered into the input field is not a number or if it's less than or equal to zero. 
    if(isNaN(input.value) || input.value <=0) {
        // This ensures that the quantity is always a positive integer.
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    // retrieves "Add to Cart" button
    var button = event.target
    // finds the parent element of the parent element of the clicked button.
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}
// creates a new row in the shopping cart with details of the item (title, price, image), adds it to the cart if it's not already there, and sets up event listeners for the remove button and quantity input field.
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    // It adds the class 'cart-row' to the newly created cartRow element.
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('click', quantityChanged)
    
}
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}