showProducts();

// Get All product in API
async function getProducts() {
    const prod = new ServiceProduct();
    const result = await prod.fetchAll();
    return result;
}

// Display product list
async function showProducts() {
    const result = await getProducts()
        .then(productList => {
            for (let product of productList) {
                // Create element anchor 
                let items = document.getElementById("items");
                let anchorBloc = document.createElement("a");
                items.appendChild(anchorBloc);
                anchorBloc.href = `product.html?id=${product._id}`

                // Create element article 
                let article = document.createElement("article");
                anchorBloc.appendChild(article);

                // Create element image to display image of product
                let newImg = document.createElement("img");
                article.appendChild(newImg);
                newImg.src = product.imageUrl;
                newImg.alt = product.altTxt;

                // Create element title to display name of product
                let newTitle = document.createElement("h3");
                article.appendChild(newTitle);
                newTitle.classList.add("productName");
                newTitle.innerHTML = product.name;

                // Create element paragraph to display description of product
                let newDescribe = document.createElement("p");
                article.appendChild(newDescribe);
                newDescribe.classList.add("productDescription");
                newDescribe.innerHTML = product.description;

            }
        })
}
