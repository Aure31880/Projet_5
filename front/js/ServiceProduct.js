class ServiceProduct {

    async fetchAll() {
        return await fetch('http://localhost:3000/api/products')
            .then(data => data.json())
            .then(products => products.map(product => new Product(product)));
    }

    async fetchOne(productId) {
        return await fetch(`http://localhost:3000/api/products/${productId}`)
            .then(data => data.json())
            .then(product => new Product(product));
    }


}