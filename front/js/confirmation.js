const orderId = getOrderId()
displayOrderIdNumber(orderId)
cleanUpOrder()
function getOrderId() {
const str = window.location.search
const urlParams = new URLSearchParams(str)
return urlParams.get("orderId")
}



function displayOrderIdNumber(orderId) {
const orderIdElement = document.querySelector("#orderId")
orderIdElement.innerHTML = orderId}

function cleanUpOrder() {
localStorage.clear()
}