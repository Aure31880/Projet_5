
async function shoppingList() {
    const newCart = new ServiceProduct();

    const cart = await newCart.getShoppingList();
    console.log(cart);
}

shoppingList();