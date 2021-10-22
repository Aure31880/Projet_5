
async function getProduct() {
    const prod = new ServiceProduct();

    let params = (new URL(document.location)).searchParams;
    const productId = params.get("_id");

    const product = await prod.fetchOne(productId);
    // console.log(Object.values(product.colors))
    // const colorProd = Object.values(product.colors);
    console.log(product);

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
              <label for="color-select">Choisir une taille :</label>
              <select name="color-select" id="colors"></select>
            </div>

            <div class="item__content__settings__quantity">
              <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
              <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
            </div>
          </div>

          <div class="item__content__addButton">
            <button id="addToCart">Ajouter au panier</button>
          </div>

        </div>
      </article>
    `


    function getColor(item) {
        const showColor = document.getElementById("colors");
        for (let color of product.colors) {
            showColor.innerHTML +=
                `
            <option value="">${color}</option>


            `
        }

    }
    getColor();
}

getProduct();



