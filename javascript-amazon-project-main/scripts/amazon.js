import { cart } from "../data/cart.js";

// Creates the HTML for the products
let productsHTML = ''

products.forEach((product) =>{
  productsHTML += `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars *10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            &#8358 ${product.price}
          </div>

          <div class="product-quantity-container">
            <select class ="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
  
})

// Puts the HTML on the page
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// Code to add items to cart and check whether they've been added before
document.querySelectorAll('.js-add-to-cart').forEach((button) =>{
  button.addEventListener('click',() =>{
    const productId = button.dataset.productId;

    document.querySelector(`.js-added-to-cart-${productId}`).classList.add('show');

    setTimeout(()=>{
     document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('show');
    },2500)

    let matchingItem;


    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    )
    cart.forEach((item) =>{
      if (productId === item.productId) {
        matchingItem=item;
      }
    });

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


    // Update the Cart quantity
    let cartQuantity = 0;
    cart.forEach((item) =>{
      cartQuantity+= item.quantity
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity

  })
});