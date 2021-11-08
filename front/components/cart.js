
async function shoppingList() {

  const serviceProduct = new ServiceProduct();

  const cart = await Promise.all(serviceProduct.getShoppingList());
  // console.log(cart);

  for (let prodCart of cart) {
    // console.log(prodCart);
    document.getElementById("cart__items").innerHTML +=
      `
                <article class="cart__item" ">
                    <div class="cart__item__img">
                      <img src="${prodCart.image}" alt="Photographie d'un canapé">
                    </div>
                    <div class="cart__item__content">
                      <div class="cart__item__content__titlePrice">
                        <h2>${prodCart.name}</h2>
                        <p>${prodCart.option}</p>
                        <p>${prodCart.price}</p>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                          <p>Qté : </p>
                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${prodCart.quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p class="deleteItem" data-id="${prodCart.id}"">Supprimer</p>
                        </div>
                      </div>
                    </div>
                </article>

            `

    function getAllProductQuantity() {
      const getTotalProducts = document.querySelector(".itemQuantity");
      const totalProducts = getTotalProducts.value;
      // console.log(totalProducts);

      let tab = [];

      for (let prod of cart) {
        const total = prod.quantity;
        // console.log(total);

        tab.push(total)
      }

      let tabParse = [];

      const formatResult = Object.values(tab);
      // console.log(formatResult);
      formatResult.forEach(elements => {
        // console.log(elements);
        const resultParse = parseInt(elements);
        tabParse.push(resultParse);
        console.log(tabParse);

        const reducer = (accumulator, curr) => accumulator + curr;
        const showAllQuantity = tabParse.reduce(reducer);
        document.getElementById('totalQuantity').innerHTML = showAllQuantity;

      });
    }
    getAllProductQuantity();

    // Remove one Product from localStorage
    function removeItem() {
      const btnDel = document.getElementsByClassName('deleteItem');
    }


    function getTotalAmount() {

    }

    // const btnDel = document.getElementsByClassName('deleteItem');
    // for (let i = 0; i < btnDel.length; i++) {
    //   btnDel[i].addEventListener('click', function (e) {
    //     e.preventDefault();
    //     let id = cart[i].id;
    //     console.log(id);
    //     serviceProduct.removeProduct(id)
    //     console.log(cart);
    //   })
    // }



  }

}

shoppingList();


