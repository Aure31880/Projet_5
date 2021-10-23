class Product {
    constructor(productList) {
        productList && Object.assign(this, productList)
    }

    // Convert price 
    getPriceFormat(product) {
        let price = this.price;
        price = new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
        }).format(price);
        return price;
    }

}