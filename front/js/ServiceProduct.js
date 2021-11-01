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

    updateProduct(product) {
        let shoppingList = this.getShoppingList()

        shoppingList = shoppingList.filter(el => el.id === product.id);
        console.log(shoppingList);
        return product.quantity++;
        // for (let prod of shoppingList) {
        //     if (prod.id != 'undefined') {
        //         const addQt = parseInt(prod.quantity, 10) + 1;
        //         console.log(addQt);
        //     }
        // }
        // if (shoppingList) {
        //     console.log(produc.quantity);
        // }

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
