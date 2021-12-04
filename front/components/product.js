const prod = new ServiceProduct();

showProduct();

// Get the id, return the product and this details
async function getByProduct() {
  let params = (new URL(document.location)).searchParams;
  const productId = params.get("id");
  const product = await prod.fetchOne(productId);

  return product;
}

async function showProduct() {
  const getProduct = await getByProduct()
    .then(product => {
      // Create element to display image of product
      let itemImg = document.querySelector('.item__img');
      let newImg = document.createElement("img");
      newImg.src = product.imageUrl;
      newImg.alt = product.altTxt;
      itemImg.appendChild(newImg);

      // Display name of product
      document.getElementById("title").innerText = product.name;

      //Display price of product 
      document.getElementById("price").innerText = product.price;

      // Display description of product
      document.getElementById("description").innerText = product.description;

      // Display color settings of product
      getColor(product)

      // Button for add product to shoppingBag
      addProduct(product);
    })
}

// Get color array for select
async function getColor() {
  const product = await getByProduct()
  var showColor = document.querySelector("#colors");

  for (let color of product.colors) {
    showColor.innerHTML += `<option value="${color}">${color}</option>`
  }
}

function addProduct(product) {
  var showColor = document.querySelector("#colors");
  // Each click get product info and bind singleProduct with values
  document.querySelectorAll("#addToCart").forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      // Get color option selected by user
      const colorChoice = showColor.value;
      // Get quantity selected by user
      const qt = document.getElementById("quantity")
      const quantity = qt.value;

      // Create new product
      let singleProduct = {
        id: product._id,
        option: colorChoice,
        quantity: quantity
      };

      // Checks if option is not null
      if (singleProduct.option != '') {
        console.log(true);
      } else {
        alert("Vous devez selectionner une couleur !")
        return false;
      }

      const prodList = prod.getShoppingList();
      // Checked if product to add exist in shopping bag
      const getEl = prodList.filter(el => el.id === singleProduct.id);
      // Ckecks if product is already in localStorage
      if (getEl != null) {
        var prodExist = getEl.filter(el => el.option === singleProduct.option);
        if (prodExist != false) {
          for (var el of prodExist) {
            // Parse quantity for incremement product
            const getQuantity = parseInt(el.quantity);
            const addQty = parseInt(quantity);
            const showQty = addQty + getQuantity;
            el.quantity = showQty.toString();

            // Use method from class ServiceProduct to update quantity of product
            prod.updateProduct(prodList);
            alert("votre produit à bien été ajouté !")
          }
        } else {
          // Use method from class ServiceProduct to add product in shopping bag
          prod.addToShoppingList(singleProduct);
          alert("votre produit à bien été ajouté !")
        }
      }
    })
  })
}

