class ServiceProduct {

    // Get all items
    async fetchAll() {
        return await fetch('http://localhost:3000/api/products')
            .then(data => data.json())
            .then(products => products.map(product => new Product(product)));
    }

    // Get one item by id
    async fetchOne(productId) {
        return await fetch(`http://localhost:3000/api/products/${productId}`)
            .then(data => data.json())
            .then(product => new Product(product));
    }

    addToShoppingList(product) {
        let shoppingList = getShoppingList();
        shoppingList.push({ _id: product });
        saveshoppingList(shoppingList)

    }

    getShoppingList() {
        let shoppingList = localStorage.getItem("shoppingList");

        if (shoppingList == null) {
            return [];
        } else {
            return JSON.parse(shoppingList);
        }
    }

    saveshoppingList(shoppingList) {
        localStorage.setItem("shoppingList", JSON.stringify(shoppingList))
    }
}