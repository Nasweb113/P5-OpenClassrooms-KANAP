/* The following function iterates over the local storage keys and gets the value set for each key:
use .length to find the number of items
for (let i = 0; i < localStorage.length; i++) {
  console.log(localStorage.getItem(localStorage.key(i)));
}
*/
const cart = [] //global variable

retrieveItemsFromCache()
cart.forEach((item) => displayItem(item))

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

function retrieveItemsFromCache() {
  const numberOfItems = localStorage.length
  for(let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || ""
    const itemObject = JSON.parse(item)
    cart.push(itemObject) //JSON.parse() converts a string into a JavaScript object
    
}
}


/******DISPLAY****** */


function displayItem(item) {
  const article = makeArticle(item) // makeArticle() returns an article element
  displayArticle(article)
  
  const imageDiv = makeImageDiv(item) //makeImageDiv() returns a div element
  article.appendChild(imageDiv)
  
  const cartitemcontent = makeCartContent(item)//adding info of the item to the cart
  article.appendChild(cartitemcontent)

  displayTotalPrice()
  displayTotalQuantity()
}
//TOTAL QUANTITY
function displayTotalQuantity() {
  const totalQuantity = document.querySelector("#totalQuantity")
  let total = 0
  cart.forEach((item) => {
    total += item.quantity
  })
  totalQuantity.textContent = total
}
//TOTAL PRICE
function displayTotalPrice() {
  let total = 0;
  const totalPrice = document.querySelector("#totalPrice")
  cart.forEach((item) => {
    const totalUnitPrice = item.price * item.quantity
    total += totalUnitPrice
  })
totalPrice.textContent = total
}

//DISPLAY ARTICLE
function makeCartContent(item) {
  const cardItemContent = document.createElement("div")
  cardItemContent.classList.add("cart__item__content")

  const description = makeDescription(item)
  const settings = makeSettings(item)
  
  cardItemContent.appendChild(description)
  cardItemContent.appendChild(settings)
  return cardItemContent
  //cardItemContent.appendChild(settings)
}
//DISPLAY DESCRIPTION
function makeSettings(item) {
  const settings = document.createElement("div")
  settings.classList.add("cart__item__content__settings")

  addQuantityToSettings(settings, item)
  addDeleteToSettings(settings, item)
  return settings
}
//DELETE BUTTON
function addDeleteToSettings(settings, item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__content__settings__delete")
  div.addEventListener("click", () => deleteItem(item))
  const p = document.createElement("p")
  p.textContent = "Delete"
  div.appendChild(p)
  settings.appendChild(div)


}
//picking the correct item to delete matching id and color then remove item from array and local storage
function deleteItem(item) {
  
  const itemToDelete = cart.findIndex((product) => product.id === item.id && product.color === item.color)
  cart.splice(itemToDelete, 1)
  displayTotalPrice()
  displayTotalQuantity()
  deleteDataFromCache(item)
  deleteArticleFrompage(item)
}
//QUANTITY
function addQuantityToSettings(settings, item) {
  const quantity = document.createElement("div")
  quantity.classList.add("cart__item__content__settings__quantity")
  const p = document.createElement("p")
  p.textContent = "Quantity : "
  quantity.appendChild(p)
  const input = document.createElement("input")
  input.type = "number"
  input.classList.add("itemQuantity")
  input.name = "itemQuantity"
  input.min = "1"
  input.max = "100"
  input.value = item.quantity
  input.addEventListener("input", () => updateTotalPriceAndQuantity(item.id, input.value, item))

  settings.appendChild(quantity)
  quantity.appendChild(input)
}
//update the total price and quantity when changes are made
function updateTotalPriceAndQuantity(id, newValue, item) {

  const itemToUpdate = cart.find((item) => item.id === id)
  itemToUpdate.quantity = Number(newValue)

  displayTotalPrice()
  displayTotalQuantity()
  
}
//REMOVE ARTICLE FROM PAGE
function deleteArticleFrompage(item) {
  const articleToDelete = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`)
    
  articleToDelete.remove()
}
//REMOVE ARTICLE FROM CACHE
function deleteDataFromCache(item) {
  const key = `${item.id}-${item.color}`
  localStorage.removeItem(key)
}
//SAVING TO CACHE
function saveNewDataToCache(item) {
  const dataToSave = JSON.stringify(item)
  const key = `${item.id}-${item.color}`
  localStorage.setItem(key, dataToSave)
  
}
//DESCRIPTION OF ITEM

function makeDescription(item) {
  const description = document.createElement("div")
  description.classList.add("cart__item__content__description")

  const h2 = document.createElement("h2")
  h2.textContent = item.name

  const p = document.createElement("p")
  p.textContent = item.color

  const price = document.createElement("p")
  price.textContent = item.price + "€"

  description.appendChild(h2)
  description.appendChild(p)
  description.appendChild(price)
  return description
}


//DISPLAY ARTICLE
function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article)

}

//BUILDING ARTICLE ELEMENT
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset - dataset is a property that returns an object containing all the data attributes of the element
function makeArticle(item) {
  const article = document.createElement("article")
  
  article.classList.add("cart__item")
  article.dataset.id = item.id
  article.dataset.color = item.color
  return article
}
//BUILDING IMAGE DIV
function makeImageDiv(item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__img")
  const image = document.createElement("img")
  image.src = item.imageUrl
  image.alt = item.altTxt
  div.appendChild(image)
  return div
}
//SUBMIT FORM
function submitForm(e) {
  e.preventDefault() //stop the refresh of the page
  if (cart.length === 0) {
    alert("Your cart is empty")
    return
  }
  
  if (emailIsValid()) return
  if (isFormInvalid())return

  const body = makeRequestBody()
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
  }
})

    .then((res) => res.json())
    .then((data) =>{
      const orderId = data.orderId
      window.location.href = "confirmation.html" + "?orderId=" + orderId
      
    })
  .catch((err) => console.log(err))
}
//VALIDATING EMAIL
function emailIsValid() {
  const email = document.querySelector("#email").value
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  if (regex.test(email) === false) {
    alert("Please fill out your email correctly (ex: example@example.com)")
    return true
  }
  return false
}
//VALIDATING FORM
function isFormInvalid() {
  const form = document.querySelector(".cart__order__form")
  const inputs = form.querySelectorAll("input")
  inputs.forEach((input) => {
    if (input.value === "") { //if a line is empty it will return error
      alert("Please fill out all fields")
      return true
    }
    return false
  })
}
//MAKING REQUEST BODY
function makeRequestBody() {
  const form = document.querySelector(".cart__order__form")
  const firstName = form.elements.firstName.value
  const lastName = form.elements.lastName.value
  const address = form.elements.address.value
  const city = form.elements.city.value
  const email = form.elements.email.value
  const body = {
    contact: {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email, 
  },
  products: getIdsFromCache()
}
return(body)
}
//GETTING IDS FROM CACHE
function getIdsFromCache() {
  const numberOfProducts = localStorage.length
  const ids = []
  for (let i = 0; i < numberOfProducts; i++) {
    const key = localStorage.key(i)
    
    const id = key.split("-")[0] //split the key to get the id split by "-"
    ids.push(id)
  }
  return ids
}