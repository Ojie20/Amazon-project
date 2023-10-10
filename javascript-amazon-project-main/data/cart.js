import { products } from "../data/products.js";
import { genId } from "../utils/id-gen.js";

export let orderedItems = [];

export function placeOrder() {
  orderedItems.push(
    {
      cart: cart,
      id: genId(orderedItems)
    }
  )
  console.log(orderedItems);
  cart = [];
  saveToStorage();
}

export function calculatePrice() {
  let prePrice=0;
  cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product)=>{
      if (product.id=== productId){
        matchingProduct=product;
      }
    });
    prePrice += matchingProduct.price * cartItem.quantity
  });
  document.querySelector('.js-pre-price').innerHTML= prePrice;

  let taxPrice = (prePrice*5)/100
  document.querySelector('.js-tax-price').innerHTML= taxPrice;

  let totalPrice = prePrice +taxPrice;
  document.querySelector('.js-total-price').innerHTML= totalPrice;
}

export let cart=JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [];
}


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

// Function to Add items to cart
export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) =>{
    if (productId === cartItem.productId) {
      matchingItem=cartItem;
    }
  });

  // Gets the Amount of product added to cart
  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  )
  const quantity = Number(quantitySelector.value);

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


// Function to remove Items from cart
export function removeFromCart(productId) {
  const newCart =[];

  cart.forEach((cartItem)=>{
    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateQuantity(productId,newQuantity) {
  let matchingItem;
  cart.forEach((cartItem)=>{
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
    matchingItem.quantity = newQuantity;
    saveToStorage();
  });
}