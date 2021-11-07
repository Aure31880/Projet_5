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

    // Add product in the localStorage
    addToShoppingList(product) {
        let shoppingList = this.getShoppingList();

        shoppingList.push(product);
        this.saveshoppingList(shoppingList);

    }

    // Update quantities of element in the localStorage 
    updateProduct(shoppingListUpdate) {
        let shoppingList = shoppingListUpdate;

        this.saveshoppingList(shoppingList);
    }

    // Remove an element in the localStorage
    removeProduct(productId) {
        let shoppingList = this.getShoppingList();
        shoppingList = shoppingList.filter(product => product.id != productId)
        this.saveshoppingList(shoppingList)
        return location.reload();
    }

    // Get all elements in the localStorage
    getShoppingList() {
        let shoppingList = localStorage.getItem("shoppingList");

        if (shoppingList == null) {
            return [];
        } else {
            return JSON.parse(shoppingList);
        }
    }

    // Get one element by id in the localStorage
    getShoppingProductId() {
        return this.getShoppingList().map(product => product.id);
    }

    // Save shoppingList in the localStorage
    saveshoppingList(shoppingList) {
        localStorage.setItem("shoppingList", JSON.stringify(shoppingList))
    }
}
