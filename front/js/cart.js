/* The following function iterates over the local storage keys and gets the value set for each key:
use .length to find the number of items
for (let i = 0; i < localStorage.length; i++) {
  console.log(localStorage.getItem(localStorage.key(i)));
}
*/
const cart = []
const quantityOfItems = localStorage.length
cart.forEach((item) => displayItem(item))

recoverItems()

function recoverItems(){
  
  for(let i = 0; i < quantityOfItems; i++) {
    const key = localStorage.key(i)
    const item = JSON.parse(localStorage.getItem(key)) //JSON.parse() converts a string into a JavaScript object
    console.log(item)
}
}

function displayItem(item) {
  const article = makeArticle(item)
  console.log(article)
  const image = makeImage(item)


}
function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article)

}
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset - dataset is a property that returns an object containing all the data attributes of the element
function makeArticle(item) {
  const article = document.createElement("article")
  article.classList.add("card__item")
  article.dataset.id = item.id
  article.dataset.color = item.color
  return article
}

function makeImage(item) {
  const image = document.createElement("img")
  image.src = item.imageUrl
  image.alt = item.altTxt
  return image
}