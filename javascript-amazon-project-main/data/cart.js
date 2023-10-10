import { products } from "../data/products.js";
import { genId } from "../utils/id-gen.js";

export let orderedItems = JSON.parse(localStorage.getItem('ordered'));

if (!orderedItems) {
  orderedItems = [];
}


export function placeOrder() {
  orderedItems.push(
    {
      cart: cart,
      id: genId(orderedItems),
      price : calculatePrice('value'),
      orderdate : new Date().toDateString(),
    }
  )
  console.log(orderedItems);
  console.log(deliverydate(orderedItems[0].orderdate));
  cart = [];
  saveToStorage();
}

function deliverydate(orderdate) {
  let msec = Date.parse(orderdate);


let deliveryCalc = msec + 604800000;
let deliveryDate = new Date(deliveryCalc);
return deliveryDate;
}


export let cart=JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [];
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('ordered', JSON.stringify(orderedItems))
}


export function calculatePrice(use) {
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
  let taxPrice = (prePrice*5)/100
  let totalPrice = prePrice +taxPrice;

  if(use=== 'value'){
    return totalPrice
  }

  document.querySelector('.js-pre-price').innerHTML= prePrice;
  document.querySelector('.js-tax-price').innerHTML= taxPrice;
  document.querySelector('.js-total-price').innerHTML= totalPrice;
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