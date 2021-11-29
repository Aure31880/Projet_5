// Get the id, return the product and this details
async function showProduct() {
  const prod = new ServiceProduct();
  let params = (new URL(document.location)).searchParams;
  const productId = params.get("_id");
  const product = await prod.fetchOne(productId);

  document.getElementById("item_productPage").innerHTML +=
    `
      <article>
        <div class="item__img">
          <img src="${product.imageUrl}" alt="Photographie d'un canapé">
        </div>
        <div class="item__content">

          <div class="item__content__titlePrice">
            <h1 id="title">
              ${product.name}
            </h1>
            <p>Prix : <span id="price">
                ${product.getPriceFormat()}
              </span>€</p>
          </div>

          <div class="item__content__description">
            <p class="item__content__description__title">Description :</p>
            <p id="description">
              ${product.description}
            </p>
          </div>

          <div class="item__content__settings">
            <div class="item__content__settings__color">
              <label for="color-select">Choisir une couleur :</label>
              <select name="color-select" id="colors"></select>
            </div>

            <div class="item__content__settings__quantity">
              <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
              <input type="number" name="itemQuantity" min="1" max="100" value="1" id="quantity">
            </div>
          </div>

          <div class="item__content__addButton">
            <button id="addToCart"">Ajouter au panier</button>
          </div>

        </div>
      </article>
    `

  const showColor = document.querySelector("#colors");

  // Get color array for select
  function getColor() {
    for (let color of product.colors) {
      showColor.innerHTML += `<option value="${color}">${color}</option>`
    }
  }
  getColor();

  function addProduct(item) {
    // each click get product info and bind singleProduct with values
    document.querySelectorAll("#addToCart").forEach(el => {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        // Get color option selected by user
        const colorChoice = showColor.value;
        // get quantity selected by user
        const qt = document.getElementById("quantity")
        const quantity = qt.value;

        // Create new product
        let singleProduct = {
          id: product._id,
          image: product.imageUrl,
          name: product.name,
          option: colorChoice,
          price: product.price.toString(),
          quantity: quantity
        };

        const prodList = prod.getShoppingList();
        const getEl = prodList.filter(el => el.id === singleProduct.id);
        if (getEl != null) {
          var prodExist = getEl.filter(el => el.option === singleProduct.option);

          if (prodExist != false) {
            for (var el of prodExist) {
              // parse quantity for incremement product
              const getQuantity = parseInt(el.quantity);
              const addQty = parseInt(quantity);
              const showQty = addQty + getQuantity;
              el.quantity = showQty.toString();
              prod.updateProduct(prodList);
            }
          } else {
            prod.addToShoppingList(singleProduct);
          }
        }
      })
    })
  }
  addProduct();
}
showProduct();



