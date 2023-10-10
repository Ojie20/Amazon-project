import { cart , removeFromCart, updateQuantity, calculatePrice} from "../data/cart.js";
import { products } from "../data/products.js";

const d = new Date();
 let msec = Date.parse(d);
 console.log(msec);

let deliveryCalc = msec + 604800000;
let deliveryDate = new Date(deliveryCalc);
console.log(deliveryDate.toDateString());
console.log(d.toDateString());

calculatePrice();

// to update the quantity displayed at the checkout section
function updatecartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) =>{
    cartQuantity+= cartItem.quantity
  });

  document.querySelector('.js-checkout-amount').innerHTML = cartQuantity +' items';

  document.querySelector('.js-payment-quantity').innerHTML = cartQuantity
}

updatecartQuantity();

let cartSummaryHTMl=''


cart.forEach((cartItem) => {

  const productId = cartItem.productId;

  let matchingProduct;
// Using the product's ID to get it's other values
  products.forEach((product)=>{
    if (product.id=== productId){
      matchingProduct=product;
    }
  });




cartSummaryHTMl += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${deliveryDate.toDateString()}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
          &#8358 ${matchingProduct.price}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label hide-click">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link hide-click js-update-link-${matchingProduct.id}" data-product-id= "${matchingProduct.id}">
              Update
            </span>
            <input type="number" class="quantity-input js-quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

      </div>
      </div>
`;



});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTMl

document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click', ()=>{
      const productId = link.dataset.productId;
      // calls function to remove Items from cart
      removeFromCart(productId);

      // Removes cart Item from Html
      const container = document.querySelector(`.js-cart-item-container-${productId}`)
      container.remove();
      console.log(container);

      updatecartQuantity();
      calculatePrice();
    })
})

// Make the update button interactive
document.querySelectorAll('.js-update-link').forEach((link)=>{
  link.addEventListener('click', ()=>{
    const productId = link.dataset.productId;

    document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');

    document.querySelector(`.js-quantity-label-${productId}`).classList.add('hide-click');

    document.querySelector(`.js-update-link-${productId}`).classList.add('hide-click');
  })
});

// Make the save button interactive
document.querySelectorAll('.js-save-link').forEach((link)=>{
  link.addEventListener('click', ()=>{
    const productId = link.dataset.productId;

    document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');

    const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

    console.log(cart);
    updateQuantity(productId, newQuantity);

    updatecartQuantity();

    document.querySelector('.js-quantity-label').innerHTML= newQuantity;
    
    calculatePrice();
  })
}) 