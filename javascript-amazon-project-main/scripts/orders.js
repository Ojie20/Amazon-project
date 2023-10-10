import { orderedItems, cart, saveToStorage } from "../data/cart.js";
import { products } from "../data/products.js";


let orderSummaryHTML = '';
updatecartQuantity();

function addToCart(productId, itemQuantity) {
  let matchingItem;

  cart.forEach((cartItem) =>{
    if (productId === cartItem.productId) {
      matchingItem=cartItem;
    }
  });

  // Gets the Amount of product added to cart
  const quantity = Number(itemQuantity);

  if(matchingItem){
    matchingItem.quantity += quantity;
  }
  else{
    cart.push({
      productId: productId,
      quantity: quantity
    });
  }

  saveToStorage();
}

orderedItems.forEach((order)=>{

  // This if statement prevents empty orders from being displayed
  if (order.cart.length!==0) {
    let msec = Date.parse(order.orderdate);
   console.log(msec);
   let deliveryCalc = msec + 604800000;
   let deliveryDate = new Date(deliveryCalc);
    orderSummaryHTML += `
    <div class="order-container">
            
            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${order.orderdate}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>&#8358 ${order.price}</div>
                </div>
              </div>
  
              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
              </div>
            </div>
  
            <div class="order-details-grid">
              
             <!--Generaed html will go here-->
  `;
  
  order.cart.forEach((cartItem) =>{
    const productId = cartItem.productId
    let matchingProduct;
  
    products.forEach((product)=>{
      if (product.id=== productId){
        matchingProduct=product;
      }
    });
  
    orderSummaryHTML += `
          <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>
  
            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${deliveryDate.toDateString()}
              </div>
              <div class="product-quantity">
                Quantity: ${cartItem.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again-button js-buy-again-button-${order.id}-${matchingProduct.id}" data-product-id = "${matchingProduct.id}" data-order-id ="${order.id}" data-item-quantity="${cartItem.quantity}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>
    `
  });
  orderSummaryHTML +=`
      </div>
    </div>
  `
    
  }
  
});

document.querySelector('.js-orders-grid').innerHTML = orderSummaryHTML


// Function to Update the Cart quantity on the page
function updatecartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) =>{
    console.log(cartQuantity);
    cartQuantity+= Number(cartItem.quantity);
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity

}

document.querySelectorAll('.js-buy-again-button').forEach((button)=>{
  button.addEventListener('click', ()=>{
    const productId = button.dataset.productId;
    const orderId = button.dataset.orderId;
    const itemQuantity = button.dataset.itemQuantity

    document.querySelector(`.js-buy-again-button-${orderId}-${productId}`).innerHTML = `
    Added
    `;
    setTimeout(()=>{
      document.querySelector(`.js-buy-again-button-${orderId}-${productId}`).innerHTML = `
      <img class="buy-again-icon" src="images/icons/buy-again.png">
      <span class="buy-again-message">Buy it again</span>
        `;
    }, 2500)
    //  Adds product to cart
  addToCart(productId, itemQuantity);
  // Updates Cart Quantity
  updatecartQuantity();
  })
})