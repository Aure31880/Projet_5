class ServiceProduct {
    // Get all items
    async fetchAll() {
        return await fetch('http://localhost:3000/api/products')
            .then(data => data.json())
            .then(products => products.map(product => new Product(product)))
            .catch(function (error) {
                console.log('Il y a eu un problème avec l\'opération fetch: ' + ' ' + error.message);
            })
    }

    // Get one item by id
    async fetchOne(productId) {
        return await fetch(`http://localhost:3000/api/products/${productId}`)
            .then(data => data.json())
            .then(product => new Product(product))
            .catch(function (error) {
                console.log('Il y a eu un problème avec l\'opération fetch: ' + ' ' + error.message);
            })
    }

    async send(data) {
        return await fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                localStorage.setItem("orderId", data);
                document.location.href = "confirmation.html?order=" + data.orderId;
                this.clearShoppingList();
            })
            .catch(err => {
                console.log(err);
            })
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
        return location.reload();
    }

    // Remove an element in the localStorage
    removeProduct(arr, product) {
        let shoppingList = arr;
        shoppingList = shoppingList.filter(function (el) {
            return el != product;
        });

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

    // Clear localStorage
    clearShoppingList() {
        localStorage.clear();
    }
}
