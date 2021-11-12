
async function shoppingList() {

  const serviceProduct = new ServiceProduct();

  const cart = await Promise.all(serviceProduct.getShoppingList());
  // console.log(cart);
  const cartParse = cart.map(product => new Product(product));
  // console.log(cartParse);


  for (let prodCart of cartParse) {
    document.getElementById("cart__items").innerHTML +=
      `
                <article class="cart__item" ">
                    <div class="cart__item__img">
                      <img src="${prodCart.image}" alt="Photographie d'un canapé">
                    </div>
                    <div class="cart__item__content">
                      <div class="cart__item__content__titlePrice">
                        <h2 data-name="${prodCart.name}">${prodCart.name}</h2>
                        <p>${prodCart.option}</p>
                        <p>${prodCart.getPriceFormat()} €</p>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                          <p>Qté : </p>
                          <input type="number" class="itemQuantity" data-option="${prodCart.option}" data-id=${prodCart.id} name="itemQuantity" min="1" max="100" step="1" value="${prodCart.quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p class="deleteItem" data-id="${prodCart.id}" data-option="${prodCart.option}">Supprimer</p>
                        </div>
                      </div>
                    </div>
                </article>

            `

    function getAllProductQuantity() {
      const getTotalProducts = document.querySelector(".itemQuantity");
      const totalProducts = getTotalProducts.value;

      let tab = [];
      for (let prod of cart) {
        const total = prod.quantity;
        tab.push(total)
      }

      let tabParse = [];
      const formatResult = Object.values(tab);
      // console.log(formatResult);
      formatResult.forEach(elements => {
        // console.log(elements);
        const resultParse = parseInt(elements);
        tabParse.push(resultParse);
        // console.log(tabParse);

        const reducer = (accumulator, curr) => accumulator + curr;
        // console.log(reducer);
        const showAllQuantity = tabParse.reduce(reducer);
        document.getElementById('totalQuantity').innerHTML = showAllQuantity;

      });
    }
    getAllProductQuantity();

    // Remove one Product from localStorage
    function removeItem(item) {
      var option = null;
      var getEl = null;

      document.querySelectorAll('.deleteItem').forEach(el => {
        // console.log(el.dataset.id);
        el.addEventListener('click', function (e) {
          e.preventDefault();

          getEl = cart.filter(el => el.id === this.dataset.id);

          if (getEl !== null) {
            option = getEl.find(el => el.option === this.dataset.option);

            if (option != null) {
              serviceProduct.removeProduct(cart, option);
            }
          }
        })
      })
    }
    removeItem();


    function getTotalAmount() {
      var productFilter = null;
      var totalAmount = null;
      let arrTotalAmount = [];

      cart.forEach(product => {
        // console.log(product);

        productFilter = cartParse.filter(function (prod, property) {
          return ((prod["id"] === product.id && prod["option"] === product.option && prod["quantity"] === product.quantity && prod["price"] === product.price));
        })

        for (let el of productFilter) {
          var qtyParse = parseInt(el.quantity);
          var priceParse = parseInt(el.price);
          // console.log(qtyParse * priceParse);
          totalAmount = qtyParse * priceParse;
          arrTotalAmount.push(totalAmount);
          // console.log(arrTotalAmount);

          const reducer = (accumulator, curr) => accumulator + curr;
          const showAllQuantity = arrTotalAmount.reduce(reducer);
          document.getElementById('totalPrice').innerHTML = showAllQuantity;

        }
      })
    }
    getTotalAmount();

    function updateQuantity() {
      var dataId = null;
      var dataOption = null;
      var productToUpdate = null;

      const input = document.querySelectorAll('.itemQuantity')
      input.forEach(el => {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          dataId = this.dataset.id;
          dataOption = this.dataset.option;

          productToUpdate = cart.filter(function (product, i) {
            return ((product["id"] == dataId && product["option"] == dataOption));
          })
          // console.log(el.value);
          for (let prod of productToUpdate) {
            // console.log(prod.quantity);
            prod.quantity = el.value;
            // console.log(prod);
            // console.log(cart);
            serviceProduct.updateProduct(cart);
          }
        })
      })
    }
  }
  if (cartParse != false) {
    updateQuantity();
    if (updateQuantity()) {
      getTotalAmount();
    }
  }

  function regexFormName(value) {
    return /(^[A-Z])/.test(value)
  }

  function validForm() {
    // var regFirstName = /(^[A-Z]+[a-zàáâãäåòóôõöøèéêëçìíîïùúûüÿñ]+)$/g
    // var regName = /(^[A-Z]+[a-zàáâãäåòóôõöøèéêëçìíîïùúûüÿñ]+)$/g
    // var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var getName = document.getElementById('lastName');
    var firstName = document.getElementById('firstName');
    var address = document.getElementById('address');
    var email = document.getElementById('email');
    var firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
    var nameErrorMsg = document.getElementById('lastNameErrorMsg');
    var addressErrorMsg = document.getElementById('addressErrorMsg');
    var verifRegFirstName = null;
    var verifRegName = null;
    var verifRegEmail = null;

    // let input = document.querySelectorAll("div.cart__order__form__question > input[name]");
    // console.log(input);
    let subOrder = document.querySelectorAll('#order');
    subOrder.forEach(elBtn => {
      elBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var arrError = [];
        verifRegFirstName = validNameInput(firstName.value)
        // console.log(verifRegFirstName);
        verifRegName = validNameInput(getName.value);
        // console.log(verifRegName);
        verifRegCity = validAdressInput(address.value);
        console.log(verifRegCity);
        verifRegEmail = validEmailInput(email.value);
        console.log(verifRegEmail);


        if (firstName.value.length <= 2 || firstName.value.length >= 24) {
          arrError.push("Votre prénom doit comporter entre 2 et 20 caractères !");
          firstNameErrorMsg.innerText = arrError;
          return false
        }

        if (verifRegFirstName != true) {
          arrError.push("Votre prénom ne doit pas comporter de chiffre ou de caractères spéciaux !");
          firstNameErrorMsg.innerText = arrError;
          return false
        }


        if (getName.value.length <= 2 || getName.value.length >= 24) {
          arrError.push("Votre Nom doit comporter entre 2 et 20 caractères !");
          nameErrorMsg.innerText = arrError;
          return false
        }
        if (verifRegName != true) {
          arrError.push("Votre Nom ne doit pas comporter de chiffre ou de caractères spéciaux !");
          nameErrorMsg.innerText = arrError;
          return false
        }

        if (verifRegCity != true) {
          arrError.push("Vous devez renseigner une adresse valide !");
          addressErrorMsg.innerText = arrError;
        }

        if (arrError.length >= 0) {
          e.preventDefault();
          return arrError.join(', ');
        }
      })
    })


  }
  validForm();

  function validNameInput(value) {
    return /(^[A-Z]+[a-zàáâãäåòóôõöøèéêëçìíîïùúûüÿñ]+)$/g.test(value);
  }

  function validAdressInput(value) {
    return /([0-9 A-Za-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð])$/g.test(value);
  }

  function validEmailInput(value) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
  }
}

shoppingList();


