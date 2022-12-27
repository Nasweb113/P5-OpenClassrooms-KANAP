const str = window.location.search
const urlParams = new URLSearchParams(str)
const id = urlParams.get("id")
console.log("id = " + id)


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


const button = document.querySelector("#addToCart")
button.addEventListener("click", (e) => { 
const color = document.querySelector("#colors").value
const quantity = document.querySelector("#quantity").value
if (color == null || color === "" || quantity == null || quantity === "") {
  alert("Please select a color and quantity")
}  
})































































/*


function useData(sofa){
const altTxt  = sofa.altTxt
const colors = sofa.colors
const description = sofa.description
const imageUrl = sofa.imageUrl
const name = sofa.name
const price = sofa.price
const _id = sofa._id
addImage(imageUrl, altTxt)
makeTitle(name)
}

function addImage(imageUrl, altTxt) {
  const image = document.createElement("img")
  
  image.src = imageUrl
  image.alt = altTxt
  const parent = document.querySelector(".item__img")
  if (parent != null) parent.appendChild(image)
}
function makeTitle(name) {
  const h1 = document.querySelector("#title")
  if (h1 != null)h1.textContent = name
}
*/



