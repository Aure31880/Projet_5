async function showProducts() {
    const prod = new ServiceProduct();
    const result = await prod.fetchAll();
    console.log(result);

    for (let product of result) {
        document.getElementById("items").innerHTML +=
            `
                <a href="./product.html?_id=${product._id}">
                    <article>
                        <img class="home_item_img" src="${product.imageUrl}">
                        <h3 class="productName"> ${product.name}</h3 >
                        <p class="productDescription">${product.description}</p>
                        <p>${product.getPriceFormat()}€</p>
                    </article >
                </a >
            
            `
    }
}

showProducts();