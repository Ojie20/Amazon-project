export let cart= [
  {
    productId: 'r',
    quantity: 2
  },
  {
    productId: 'b',
    quantity: 1
  }
];

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
}


export function removeFromCart(productId) {
  const newCart =[];

  cart.forEach((cartItem)=>{
    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    }
  });

  cart = newCart;
}