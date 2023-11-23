let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];

//function to show all shopItemProducts
let generateShop = () => {
  return (shop.innerHTML = shopItemProducts
    .map((x) => {
      let { id, name, desc, price, img } = x;
      let search = basket.find((item) => item.id === id) || [];
      return `<div id=product-id-${id} class="item"> 
        <img  src=${img} alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div  id=${id} class="quantity">
                    ${search.item === undefined ? 0 : search.item}
                    </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
     </div> `;
    })
    .join(" "));
};
generateShop();

//function to increase the number of items in the cart
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
  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedId.id);
};

//FUNCTION to decrease the number of items of the product
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
  localStorage.setItem("data", JSON.stringify(basket));
};

// function to show the current number of items in the bucket
let update = (id) => {
  let search = basket.find((item) => {
    return item.id === id;
  });
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

// function to show the accumulated value of all the items being choosen! 
let calculation = () => {
  let cartValue = document.getElementById("cartNum");
  let total = basket
    .map((currentItem) => currentItem.item)
    .reduce((acc, cv) => acc + cv, 0);
  cartValue.innerHTML = total;
};

calculation();
