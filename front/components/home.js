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
                console.log(product);

                // Create element anchor 
                let items = document.getElementById("items");
                let anchorBloc = document.createElement("a");
                items.appendChild(anchorBloc);
                anchorBloc.href = `product.html?id=${product._id}`



                // Create element article
                let article = document.createElement("article");
                anchorBloc.appendChild(article);

                // Create element image
                let newImg = document.createElement("img");
                article.appendChild(newImg);
                newImg.src = product.imageUrl;

                // Create element title
                let newTitle = document.createElement("h3");
                article.appendChild(newTitle);
                newTitle.classList.add("productName");
                newTitle.innerHTML = product.name;

                // Create element for description
                let newDescribe = document.createElement("p");
                article.appendChild(newDescribe);
                newDescribe.classList.add("productDescription");
                newDescribe.innerHTML = product.description;

            }
        })
}
