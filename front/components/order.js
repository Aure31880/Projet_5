async function confirmOrder() {
    const serviceProduct = new ServiceProduct();
    let params = (new URL(document.location)).searchParams;
    const orderId = params.get("order");
    console.log(orderId);
    document.getElementById('orderId').innerHTML = orderId;

}
confirmOrder();