
async function shoppingList() {

  const serviceProduct = new ServiceProduct();

  const cart = await Promise.all(serviceProduct.getShoppingList());
  console.log(cart);

  for (let prodCart of cart) {
    console.log(prodCart);
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
    // document.querySelectorAll(".deleteItem").forEach(btnSup => {
    //   btnSup.addEventListener('click', function () {
    //     let id = prodCart.id;
    //     console.log(id);

    //   })
    // })

    const btnDel = document.getElementsByClassName('deleteItem');
    for (let i = 0; i < btnDel.length; i++) {
      btnDel[i].addEventListener('click', function (e) {
        e.preventDefault();
        let id = cart[i].id;
        console.log(id);
        serviceProduct.removeProduct(id)
        console.log(cart);
      })
    }

  }



  // cart.forEach((prodCart) => {
  //   console.log(prodCart);
  //   document.getElementById("cart__items").innerHTML +=
  //     `
  //               <article class="cart__item" ">
  //                   <div class="cart__item__img">
  //                     <img src="${prodCart.image}" alt="Photographie d'un canapé">
  //                   </div>
  //                   <div class="cart__item__content">
  //                     <div class="cart__item__content__titlePrice">
  //                       <h2>${prodCart.name}</h2>
  //                       <p>${prodCart.option}</p>
  //                       <p>${prodCart.price}</p>
  //                     </div>
  //                     <div class="cart__item__content__settings">
  //                       <div class="cart__item__content__settings__quantity">
  //                         <p>Qté : </p>
  //                         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${prodCart.quantity}">
  //                       </div>
  //                       <div class="cart__item__content__settings__delete">
  //                         <p class="deleteItem" data-id="${prodCart.id}"">Supprimer</p>
  //                       </div>
  //                     </div>
  //                   </div>
  //               </article>

  //           `
  // })











}

shoppingList();


