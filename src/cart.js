let label=document.getElementById("label");
let shoppingCart=document.getElementById("shopping-cart")

let basket = JSON.parse(localStorage.getItem("data")) || [];

//funtion to show the total number of products in cart on cart icon
let calculation = () => {
  let cartValue = document.getElementById("cartNum");
  let total = basket
    .map((currentItem) => currentItem.item)
    .reduce((acc, cv) => acc + cv, 0);
  cartValue.innerHTML = total;
};
calculation();

//function to show current items in cart
let cartItemsGenerator=()=>{
    if(basket.length!==0){
      return (shoppingCart.innerHTML=basket.map((x)=>{
        let {id,item}=x
        let search=shopItemProducts.find((item)=>item.id===id) || []
        return`<div class="cart-item">
         <img width="100" src=${search.img}>
         <div class="details">

            <div class="title-price-x">
              <h4 class="title-price">
                  <p>${search.name}</p>
                  <p class="cart-item-price">$ ${search.price}</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>

            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div  id=${id} class="quantity">${item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>

         <h3>$ ${item * search.price}</h3>
         </div>
        </div>`
        
      }).join(""))
    }
    else{
        shoppingCart.innerHTML=``;
        label.innerHTML=`
        <h2>Your Cart is Empty</h2>
        <a href="index.html">
        <button class="homeBtn">Back to home</button>
        </a>
        `        
    }
}

cartItemsGenerator();

//function to increase the specific number of targeted product
let increment = (id) => {
  selectedId = id;

  let search = basket.find((itemId) => itemId.id === selectedId.id);
  if (search === undefined) {
    basket.push({
      id: selectedId.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  cartItemsGenerator();
  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedId.id);
};

//function to decrease the specific number of targeted product

let decrement = (id) => {
  selectedId = id;

  let search = basket.find((itemId) => itemId.id === selectedId.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedId.id);
  basket = basket.filter((x) => x.item !== 0);
  cartItemsGenerator();
  localStorage.setItem("data", JSON.stringify(basket));
};

//function to bring visual affect of increasing/decreasing a particular item

let update = (id) => {
  let search = basket.find((item) => {
    return item.id === id;
  });
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount()
};

//function to remove the whole html element

let removeItem=(id)=>{
  selectedItem=id
  // console.log(selectedItem.id);
  basket=basket.filter((x)=>x.id!==selectedItem.id);
  cartItemsGenerator();
  calculation();
  totalAmount();
  localStorage.setItem("data", JSON.stringify(basket));

}

//function to show the total amount.

let totalAmount=()=>{
  if(basket.length!==0){
    let totalBill=basket.map((x)=>{
      let {id,item}=x;
      let search=shopItemProducts.find((item)=>item.id===id) || [];
      return item * search.price;

    }).reduce((acc,cv)=>acc+cv,0)
    // console.log(totalBill)
    label.innerHTML=`
     <h2>Total Bill : $ ${totalBill}</h2>
     <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `
  } else return;
}
totalAmount();

// function for clear cart button to clear the whole cart

let clearCart=()=>{
   basket=[];
   cartItemsGenerator();
   calculation();
   localStorage.setItem("data", JSON.stringify(basket));

}