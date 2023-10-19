const orderId = getOrderId()
displayOrderId(orderId)
const clearCache = wipeLocalStorage()

function getOrderId() {
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
return urlParams.get("orderId")

}

console.log(orderId)

function displayOrderId(orderId) {
const orderIdElement = document.querySelector("#orderId")
orderIdElement.innerHTML = orderId
}

function wipeLocalStorage() {
  const cache = window.localStorage
  cache.clear()
}





