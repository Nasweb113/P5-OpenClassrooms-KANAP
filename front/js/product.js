//Fetching the url by creating a const with the url, the using the ferch(url) function
//JSON PLACEHOLDER helps with a templaate, in app.js line 21 there is the url we use.  
//from this you have all the item info, also the ROUTES file has the routes needed.

//FETCHING NECESSARY URL PRODUCT INFO
const str = window.location.search
const urlParams = new URLSearchParams(str)
const id = urlParams.get("id")
let priceItem = 0
let imgUrl, altText, articleName

//FETCHING DATA FROM API
//using the template below to create the FETCH request and adding in the ID of the product
fetch("http://localhost:3000/api/products/" + id )

.then(response => response.json())
.then((res) => useData(res))


//COLLECTING DATA FROM API which we get after accessing the URL and it returns the info on the products

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
//ADDING IMAGE TO HTML
function addImage(imageUrl, altTxt) {
  const image = document.createElement("img") //create img element
  image.src = imageUrl //set the src attribute
  image.alt = altTxt //set the alt attribute
  const parent = document.querySelector(".item__img") //find the parent element
  if (parent != null) parent.appendChild(image) //append the image to the parent
}
// REPEAT FOR OTHERS ***********************


//CREATION OF TITLE, PRICE, DESCRIPTION AND COLORS


//ERROR LENS SAYING ITEM MAY RETURN NULL (lack of identification), googled and  eg: (h1 != null) this will 
//remove the error, 
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
// this is a select element so need to use the FOREACH and add in the option then append it.
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



//STORING THE DATA IN LOCAL STORAGE WHEN YOU CLICK ON THE BUTTON


//This requires qn EVENTLISTENER click, on the element
// storing data in local storage to add to cart
const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick) 
  
//SAVING CART
function handleClick() {
  const color = document.querySelector("#colors").value
  const quantity = document.querySelector("#quantity").value
  //NEED TO CHECK IF CART IS VALID OR NOT, FUNCTION CREATED TO VALIDATE THIS
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
    imageUrl: imgUrl, 
    altTxt: altText,
    name: articleName
  }
localStorage.setItem(key, JSON.stringify(data))
}
//CHECKING IF CART IS VALID SO ZERO or NULL CANNOT BE ADDED TO CART
//THERE IS A TEMPLATE FOR THIS 
function isCartValid(color, quantity) {
  if (color == null || color === "" || quantity == null || quantity == 0) { 
    alert("Please select a color and quantity")
    return true
  }
}
//REDIRECTING TO CART
function redirectToCart() {
  window.location.href = "cart.html"
}
