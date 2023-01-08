const orderId = getOrderId()
displayOrderIdNumber(orderId)
cleanUpOrder()

//GRABBING ORDER ID
function getOrderId() {
const str = window.location.search
const urlParams = new URLSearchParams(str)
return urlParams.get("orderId")
}


//DISPLAY ORDER NUMBER ON CONFIRMATION PAGE
function displayOrderIdNumber(orderId) {
const orderIdElement = document.querySelector("#orderId")
orderIdElement.innerHTML = orderId}

//EMPTY LOCAL STORAGE
function cleanUpOrder() {
localStorage.clear()
}



















/*const orderId = getOrderId()
displayOrderIdNumber(orderId)
//cleanUpOrder()

//GRABBING ORDER ID
function getOrderId() {
const str = window.location.search
const urlParams = new URLSearchParams(str)
return urlParams.get("orderId")
}


//DISPLAY ORDER NUMBER ON CONFIRMATION PAGE
function displayOrderIdNumber(orderId) {
const orderIdElement = document.querySelector("#orderId")
orderIdElement.innerHTML = orderId}

/*EMPTY LOCAL STORAGE
function cleanUpOrder() {
localStorage.clear()
}*/