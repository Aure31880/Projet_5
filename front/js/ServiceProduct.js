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
        let shoppingList = this.getShoppingList();

        shoppingList.push(product);
        this.saveshoppingList(shoppingList);

    }

    updateProduct(prodQtty) {
        let shoppingList = this.getShoppingList()

        const upQuantity = JSON.parse(JSON.stringify(prodQtty));
        for (let prod of shoppingList) {
            const qtt = prod.quantity;

            qtt.filter(qty = qty === upQuantity);

        }
        this.saveshoppingList(shoppingList);

    }

    removeProduct(productId) {
        let shoppingList = this.getShoppingList();
        shoppingList = shoppingList.filter(product => product.id != productId)
        this.saveshoppingList(shoppingList)
        return location.reload();
    }

    getShoppingList() {
        let shoppingList = localStorage.getItem("shoppingList");

        if (shoppingList == null) {
            return [];
        } else {
            return JSON.parse(shoppingList);
        }
    }

    getShoppingProductId() {
        return this.getShoppingList().map(product => product.id);
    }

    saveshoppingList(shoppingList) {
        localStorage.setItem("shoppingList", JSON.stringify(shoppingList))
    }
}
