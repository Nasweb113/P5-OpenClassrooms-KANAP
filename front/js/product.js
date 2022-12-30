const str = window.location.search
const urlParams = new URLSearchParams(str)
const id = urlParams.get("id")
let priceItem = 0
let imgUrl, altText, articleName


fetch("http://localhost:3000/api/products/" + id )

.then(response => response.json())
.then((res) => useData(res))



function useData(sofa) {
  const altTxt = sofa.altTxt
  const colors = sofa.colors
  const description = sofa.description
  const imageUrl = sofa.imageUrl
  const price = sofa.price
  const name = sofa.name
  priceItem = price
  imgUrl = imageUrl
  altText = altTxt
  articleName = name
  addImage(imageUrl, altTxt)
  makeTitle(name)
  addPrice(price)
  addDescription(description)
  makeColors(colors)
}
function addImage(imageUrl, altTxt) {
  const image = document.createElement("img") //create img element
  image.src = imageUrl //set the src attribute
  image.alt = altTxt //set the alt attribute
  const parent = document.querySelector(".item__img") //find the parent element
  if (parent != null) parent.appendChild(image) //append the image to the parent
}

function makeTitle(name) {
  const h1 = document.querySelector("#title")
  if (h1 != null) h1.textContent = name
}
function addPrice(price) {
  const p = document.querySelector("#price")
  if (p != null) p.textContent = price
}
function addDescription(description) {
  const desc = document.querySelector("#description")
  if (desc != null) desc.textContent = description
}
// this is a select element.
function makeColors(colors) {
  const select = document.querySelector("#colors")
  if (select != null) {
    colors.forEach((color) => {
      const option = document.createElement("option")
      console.log(option)
      option.value = color
      option.textContent = color
      select.appendChild(option)
    })
  }
}

// storing data in local storage to add to cart
const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick) 
  

function handleClick() {
  const color = document.querySelector("#colors").value
  const quantity = document.querySelector("#quantity").value
  
  if (isCartValid(color, quantity)) return
  saveCart(color, quantity)
  redirectToCart()
  
}
//save cart data and string interpolation to create a unique id for each color
function saveCart(color, quantity) {
  const key = `${id}-${color}`
  const data = {
    id: id,
    color: color,
    quantity: Number(quantity),
    price: priceItem,
    imageUrl: imgUrl, 
    altTxt: altText,
    name: articleName
  }
localStorage.setItem(key, JSON.stringify(data))
}
function isCartValid(color, quantity) {
  if (color == null || color === "" || quantity == null || quantity == 0) { 
    alert("Please select a color and quantity")
    return true
  }
}

function redirectToCart() {
  window.location.href = "cart.html"
}
