// Instance of class ServiceProduct
const serviceProduct = new ServiceProduct();

displayShoppingList();

async function getShoppingBag() {
  // Get shopping list anfd return this
  const cart = await Promise.all(serviceProduct.getShoppingList());
  const cartParse = cart.map(product => new Product(product));

  return cartParse;
}

function getInfoIdProduct(prodInBag, product) {
  prodInBag = prodInBag.filter(prod => prod._id === product.id);
  for (let prod of prodInBag) {
    return prod;
  }
}

async function displayShoppingList() {
  const productList = await serviceProduct.fetchAll();
  let prodInfo = null;
  let arrInfo = [];
  return await getShoppingBag()
    .then(product => {
      const numberOfProduct = product.length;
      for (let prod of product) {
        // Get price of product that is not saved to localStorage
        prodInfo = getInfoIdProduct(productList, prod);
        const qtyParse = parseInt(prod.quantity)
        let prodPriceQty = {
          price: prodInfo.price,
          qty: qtyParse
        };
        arrInfo.push(prodPriceQty)

        // Create element article for display shopping list
        let cartItems = document.getElementById("cart__items");
        let newArticle = document.createElement("article");
        newArticle.classList.add("cart__item");
        newArticle.setAttribute("data-id", prod.id);
        cartItems.appendChild(newArticle);

        // Create element div cart item img with image
        let newCartItemImg = document.createElement("div");
        newCartItemImg.classList.add("cart__item__img");
        newArticle.appendChild(newCartItemImg);

        let newItemImg = document.createElement("img");
        newItemImg.src = prodInfo.imageUrl;
        newItemImg.alt = prodInfo.altTxt;
        newCartItemImg.appendChild(newItemImg);

        // Create element div cart item content
        let newCartItemContent = document.createElement("div");
        newCartItemContent.classList.add("cart__item__content");
        newArticle.appendChild(newCartItemContent);

        // Create element div cart item content titlePrice
        let newCartItemContentTitlePrice = document.createElement("div");
        newCartItemContentTitlePrice.classList.add("cart__item__content__titlePrice");
        newCartItemContent.appendChild(newCartItemContentTitlePrice);

        // Create element h2 for product's name and paragraph for price
        let newTitlePrice = document.createElement("h2");
        newTitlePrice.innerText = prodInfo.name;
        newCartItemContentTitlePrice.appendChild(newTitlePrice);

        let newColor = document.createElement("p");
        newColor.innerText = prod.option;
        newCartItemContentTitlePrice.appendChild(newColor);

        let newPrice = document.createElement("p");
        newPrice.innerText = prodInfo.price + '€';
        newCartItemContentTitlePrice.appendChild(newPrice);

        // Create element cart item content settings
        let newCartItemContentSettings = document.createElement("div");
        newCartItemContentSettings.classList.add("cart__item__content__settings");
        newCartItemContent.appendChild(newCartItemContentSettings);

        // Create element cart item content settings quantity, paragraph & input
        let newCartItemContentSettingsQty = document.createElement("div");
        newCartItemContentSettingsQty.classList.add("cart__item__content__settings__quantity");
        newCartItemContentSettings.appendChild(newCartItemContentSettingsQty);

        let newQty = document.createElement("p");
        newQty.innerHTML = "Qté :";
        newCartItemContentSettingsQty.appendChild(newQty)

        let newInput = document.createElement("input");
        newInput.classList.add("itemQuantity");
        newInput.setAttribute("type", "number");
        newInput.setAttribute("name", "itemQuantity");
        newInput.setAttribute("data-option", prod.option);
        newInput.setAttribute("data-id", prod.id);
        newInput.setAttribute("min", "1");
        newInput.setAttribute("max", "100");
        newInput.setAttribute("value", prod.quantity);
        newCartItemContentSettingsQty.appendChild(newInput);
        newInput.addEventListener('change', updateQuantity.bind(prod));

        // Create element settings delete
        let newCartItemContentSettingsDelete = document.createElement("div");
        newCartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
        newCartItemContent.appendChild(newCartItemContentSettingsDelete);

        let newBtnDelete = document.createElement("p");
        newBtnDelete.classList.add("deleteItem");
        newBtnDelete.setAttribute("data-id", prod.id);
        newBtnDelete.setAttribute("data-option", prod.option);
        newBtnDelete.innerHTML = 'Supprimer';
        newCartItemContentSettingsDelete.appendChild(newBtnDelete);

        const test = document.getElementById('totalPrice');
        getTotalAmountByProduct(arrInfo)
          .then(total => {
            test.innerHTML = total
          })
        // Use fonction removeItem to remove product 
        removeItem(prod);
      }
    })
}

// Get and calcul total amount 
async function getTotalAmountByProduct(arrInfo) {
  let totalAmount = null;
  let arrTotalAmount = [];
  for (let prod of arrInfo) {
    totalAmount = prod.qty * prod.price;
    arrTotalAmount.push(totalAmount);
  }
  // Caculate total amount of arrTotalAmount and return this
  const reducer = (accumulator, curr) => accumulator + curr;
  const showAllQuantity = arrTotalAmount.reduce(reducer);
  return showAllQuantity;
}

// Get Total product in cart
async function getAllProductQuantity() {
  return await getShoppingBag()
    .then(result => {
      let arrQty = [];
      for (let prod of result) {
        const qty = prod.quantity;
        arrQty.push(qty);
      }

      let tabParse = [];
      const formatResult = Object.values(arrQty);
      formatResult.forEach(elements => {
        const resultParse = parseInt(elements);
        tabParse.push(resultParse);
        const reducer = (accumulator, curr) => accumulator + curr;
        const showAllQuantity = tabParse.reduce(reducer);
        document.getElementById("totalQuantity").innerHTML = showAllQuantity;
      })
    })
}
getAllProductQuantity();

// Remove one Product from localStorage
async function removeItem(prod) {
  return await getShoppingBag()
    .then(prodList => {
      var option = null;
      var getEl = null;

      document.querySelectorAll('.deleteItem').forEach(el => {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          // listen data-id to remove product 
          getEl = prodList.filter(el => el.id === this.dataset.id);
          if (getEl !== null) {
            // listen data-option to remove product
            option = getEl.find(el => el.option === this.dataset.option);
            if (option) {
              //use method removeProduct from ServiceProduct class
              serviceProduct.removeProduct(prodList, option);
            }
          }
        })
      })
    })
}

// Update product quantity
async function updateQuantity() {
  const cart = await getShoppingBag();
  var dataId = null;
  var dataOption = null;
  var productToUpdate = null;

  const input = document.querySelectorAll('.itemQuantity')
  input.forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      // Get data-id from product 
      dataId = this.dataset.id;
      // Get data-option from product 
      dataOption = this.dataset.option;
      // Return the right product 
      productToUpdate = cart.filter(function (product, i) {
        return ((product["id"] == dataId && product["option"] == dataOption));
      })

      for (let prod of productToUpdate) {
        prod.quantity = el.value;
        // Use method updateProduct from ServiceProduct class
        serviceProduct.updateProduct(cart);
      }
    })
  })
}

function validForm() {
  let arrError = [];

  // Get inputs values
  const name = document.getElementById('lastName');
  const firstName = document.getElementById('firstName');
  const address = document.getElementById('address')
  const city = document.getElementById('city')
  const email = document.getElementById('email')

  // Get errors messages
  const firstNameErrorMsg = document.querySelector("p#firstNameErrorMsg");
  console.log(firstNameErrorMsg);
  const nameErrorMsg = document.getElementById('lastNameErrorMsg');
  const addressErrorMsg = document.getElementById('addressErrorMsg');
  const cityErrorMsg = document.getElementById('cityErrorMsg');
  const emailErrorMsg = document.getElementById('emailErrorMsg');

  const verifRegFirstName = validNameInput(firstName.value)
  const verifRegName = validNameInput(lastName.value);
  const verifRegAddress = validAdressInput(address.value);
  const verifRegCity = validAdressInput(city.value);
  const verifRegEmail = validEmailInput(email.value);

  // Validate firstname input or send error message
  if (firstName.value.length <= 1 || firstName.value.length >= 24) {
    arrError.push("Votre prénom doit comporter entre 2 et 20 caractères !");
    firstNameErrorMsg.innerText = arrError;
    return false
  } else if (verifRegFirstName != true) {
    arrError.push("Votre prénom doit commencer par une majuscule et ne doit pas comporter de chiffre ou de caractères spéciaux !");
    firstNameErrorMsg.innerText = arrError;
    return false
  } else {
    firstNameErrorMsg.innerText = '';
  }

  // Validate name input value or send error message
  if (lastName.value.length <= 1 || lastName.value.length >= 24) {
    arrError.push("Votre Nom doit comporter entre 2 et 20 caractères !");
    nameErrorMsg.innerText = arrError;
    return false
  } else if (verifRegName != true) {
    arrError.push("Votre Nom doit commencer par une majuscule ne doit pas comporter de chiffre ou de caractères spéciaux !");
    nameErrorMsg.innerText = arrError;
    return false
  } else {
    nameErrorMsg.innerText = '';
  }

  // Validate adress input value or send error message
  if (verifRegAddress != true) {
    arrError.push("Vous devez renseigner une adresse valide !");
    addressErrorMsg.innerText = arrError;
    return false
  } else {
    addressErrorMsg.innerText = '';
  }

  // Validate city input value or send error message
  if (verifRegCity != true) {
    arrError.push("Vous devez renseigner une ville valide !");
    cityErrorMsg.innerText = arrError;
    return false
  } else {
    cityErrorMsg.innerText = '';
  }

  // Validate city input value or send error message
  if (verifRegEmail != true) {
    arrError.push("Vous devez renseigner une adresse email valide !");
    emailErrorMsg.innerText = arrError;
    return false
  } else {
    emailErrorMsg.innerText = '';
  }

  // Save in object contact form's values
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

  return contact;
}

// Validate order and send it
function validOrder() {
  let productsArr = [];
  const shoppingBag = serviceProduct.getShoppingList();
  for (let prod of shoppingBag) {
    if (prod.id != 'undefined') {
      // fill productsArr with each product id 
      productsArr.push(prod.id);
    }
  }
  const order = document.querySelector("#order");
  order.addEventListener('click', async function (e) {
    e.preventDefault()
    const contact = validForm();
    // Converting array of id into strings
    const products = productsArr.sort()
    if (products != false && contact != false) {
      let dataOrder = {
        contact,
        products
      }
      console.log(dataOrder);
      serviceProduct.send(dataOrder)
    }
  })
}
validOrder();

// Regex for firstname et lastname input
function validNameInput(value) {
  return /(^[A-Z]+[a-zàáâãäåòóôõöøèéêëçìíîïùúûüÿñ]+)$/g.test(value);
}

// Regex for adress input
function validAdressInput(value) {
  return /([0-9 A-Za-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð])$/g.test(value);
}

// Regex for email input
function validEmailInput(value) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
}
