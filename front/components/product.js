const prod = new ServiceProduct();


async function showProduct() {
    let params = (new URL(document.location)).searchParams;
    const productId = params.get("_id");

    const result = await prod.fetchOne(productId);
    console.log(result);
}

showProduct();