confirmOrder();

async function confirmOrder() {
    //  Get id order for displaying it in confirm card 
    let params = (new URL(document.location)).searchParams;
    const orderId = params.get("order");
    console.log(orderId);
    document.getElementById('orderId').innerHTML = orderId;

}