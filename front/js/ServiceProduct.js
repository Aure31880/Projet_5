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

        console.log(product.id);
        var prod = shoppingList.findIndex(item => item.id === product.id)
        console.log(prod);

        if (prod === 0) {
            console.log(product.quantity);
            const newArr = shoppingList.filter(arr => arr.quantity++);
            console.log("existe déjà !");
        } else {
            shoppingList.push(product)
            console.log("Nouveau produit !");

        }

        this.saveshoppingList(shoppingList)

    }

    removeProduct(productId) {
        let shoppingList = this.getShoppingList();
        shoppingList = shoppingList.filter(product => product.id != productId)
        this.saveshoppingList(shoppingList)
        return location.reload();
    }

    getShoppingList() {
        // return JSON.parse(localStorage?.shoppingList || null).map(async id => await this.fetchOne(id)) ?? [];

        let shoppingList = localStorage.getItem("shoppingList");

        if (shoppingList == null) {
            return [];
        } else {
            return JSON.parse(shoppingList);
        }
    }

    getShoppingProductId() {
        // return this.getShoppingList().map(async product => await this.fetchOne(product));

        return this.getShoppingList().map(product => product.id);
    }

    saveshoppingList(shoppingList) {
        localStorage.setItem("shoppingList", JSON.stringify(shoppingList))
    }
}
