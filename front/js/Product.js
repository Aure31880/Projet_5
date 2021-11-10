class Product {
    constructor(product) {
        product && Object.assign(this, product)
    }

    getPriceFormat() {
        return this.price.toLocaleString('fr-FR', {
            minimumFractionDigits: 2
        });
    }
}