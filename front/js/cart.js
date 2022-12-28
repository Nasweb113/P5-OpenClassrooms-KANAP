/* The following function iterates over the local storage keys and gets the value set for each key:
use .length to find the number of items
for (let i = 0; i < localStorage.length; i++) {
  console.log(localStorage.getItem(localStorage.key(i)));
}
*/
const cart = []

retrieveItemsFromCache()
console.log(cart)
cart.forEach((item) => displayItem(item))



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
  
  const cartitemcontent = makeCartContent(item)
  article.appendChild(cartitemcontent)

  

}


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
function makeSettings(item) {
  const settings = document.createElement("div")
  settings.classList.add("cart__item__content__settings")

  addQuantityToSettings(settings, item)
  addDeleteToSettings(settings)
  return settings
}
function addDeleteToSettings(settings) {
  const div = document.createElement("div")
  div.classList.add("cart__item__content__settings__delete")
  const p = document.createElement("p")
  p.textContent = "Delete"
  div.appendChild(p)
  settings.appendChild(div)


}
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
  settings.appendChild(input)
}

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



function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article)

}


// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset - dataset is a property that returns an object containing all the data attributes of the element
function makeArticle(item) {
  const article = document.createElement("article")
  
  article.classList.add("cart__item")
  article.dataset.id = item.id
  article.dataset.color = item.color
  return article
}

function makeImageDiv(item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__img")
  const image = document.createElement("img")
  image.src = item.imageUrl
  image.alt = item.altTxt
  div.appendChild(image)
  return div
}