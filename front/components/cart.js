async function shoppingList() {
  var serviceProduct = new ServiceProduct();
  const cart = await Promise.all(serviceProduct.getShoppingList());
  const cartParse = cart.map(product => new Product(product));

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

    // function getAllProductQuantity() {
    //   const getTotalProducts = document.querySelector(".itemQuantity");
    //   const totalProducts = getTotalProducts.value;
    //   let tab = [];

    //   for (let prod of cart) {
    //     const total = prod.quantity;
    //     tab.push(total)
    //   }

    //   let tabParse = [];
    //   const formatResult = Object.values(tab);
    //   formatResult.forEach(elements => {
    //     const resultParse = parseInt(elements);
    //     tabParse.push(resultParse);
    //     const reducer = (accumulator, curr) => accumulator + curr;
    //     const showAllQuantity = tabParse.reduce(reducer);
    // document.getElementById('totalQuantity').innerHTML = showAllQuantity;
    //   });
    // }
    // getAllProductQuantity();

    // Remove one Product from localStorage
    function removeItem(item) {
      var option = null;
      var getEl = null;

      document.querySelectorAll('.deleteItem').forEach(el => {
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
      let productFilter = null;
      let totalAmount = null;
      let arrTotalAmount = [];

      cart.forEach(product => {
        productFilter = cartParse.filter(function (prod, property) {
          return ((prod["id"] === product.id && prod["option"] === product.option && prod["quantity"] === product.quantity && prod["price"] === product.price));
        })

        for (let el of productFilter) {
          var qtyParse = parseInt(el.quantity);
          var priceParse = parseInt(el.price);
          totalAmount = qtyParse * priceParse;
          arrTotalAmount.push(totalAmount);

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
          for (let prod of productToUpdate) {
            prod.quantity = el.value;
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

  function validForm() {
    // Get inputs values
    const name = document.getElementById('lastName');
    const firstName = document.getElementById('firstName');
    const address = document.getElementById('address')
    const city = document.getElementById('city')
    const email = document.getElementById('email')

    // Get errors messages
    const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
    const nameErrorMsg = document.getElementById('lastNameErrorMsg');
    const addressErrorMsg = document.getElementById('addressErrorMsg');
    const cityErrorMsg = document.getElementById('cityErrorMsg');
    const emailErrorMsg = document.getElementById('emailErrorMsg');

    let arrError = [];
    let dataOrder = [];

    const verifRegFirstName = validNameInput(firstName.value)
    const verifRegName = validNameInput(lastName.value);
    const verifRegAddress = validAdressInput(address.value);
    const verifRegCity = validAdressInput(city.value);
    const verifRegEmail = validEmailInput(email.value);

    // Validate firstname input value
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

    // Validate name input value
    if (lastName.value.length <= 2 || lastName.value.length >= 24) {
      arrError.push("Votre Nom doit comporter entre 2 et 20 caractères !");
      nameErrorMsg.innerText = arrError;
      return false
    }
    if (verifRegName != true) {
      arrError.push("Votre Nom ne doit pas comporter de chiffre ou de caractères spéciaux !");
      nameErrorMsg.innerText = arrError;
      return false
    }

    // Validate adress input value
    if (verifRegAddress != true) {
      arrError.push("Vous devez renseigner une adresse valide !");
      addressErrorMsg.innerText = arrError;
      return false
    }

    // Validate city input value
    if (verifRegCity != true) {
      arrError.push("Vous devez renseigner une ville valide !");
      cityErrorMsg.innerText = arrError;
      return false
    }

    // Validate city input value
    if (verifRegEmail != true) {
      arrError.push("Vous devez renseigner une adresse email valide !");
      emailErrorMsg.innerText = arrError;
      return false
    }

    let contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    };
    return contact;
  }

  function validOrder() {
    let products = [];

    const shoppingBag = serviceProduct.getShoppingList();
    for (let prod of shoppingBag) {
      if (prod.id != 'undefined') {
        products.push(prod.id);
      }
    }
    const order = document.querySelector("#order");
    order.addEventListener('click', async function (e) {
      e.preventDefault()
      const contact = validForm();
      // const products = shoppingBag.sort()
      if (products != false || contact != false) {
        let dataOrder = {
          contact,
          products
        }
        serviceProduct.send(dataOrder)
      }
    })
  }
  validOrder();

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
  formatResult.forEach(elements => {
    const resultParse = parseInt(elements);
    tabParse.push(resultParse);
    const reducer = (accumulator, curr) => accumulator + curr;
    const showAllQuantity = tabParse.reduce(reducer);
    document.getElementById('totalQuantity').innerHTML = showAllQuantity;
  });
}
// getAllProductQuantity();