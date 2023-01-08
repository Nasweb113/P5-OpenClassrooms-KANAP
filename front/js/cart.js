/* The following function iterates over the local storage keys and gets the value set for each key:
use .length to find the number of items
for (let i = 0; i < localStorage.length; i++) {
  console.log(localStorage.getItem(localStorage.key(i)));
}
*/

// using RegEX to validate the form
const cart = []

retrieveItemsFromCache()
cart.forEach((item) => displayItem(item))
//ACCESSING THE ORDER BUTTON and passing the e (pass this (e) in the form submit function as an arguement)
const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))
//Get the items from the cache using the getitem
function retrieveItemsFromCache() {
  const numberOfItems = localStorage.length
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || ""
    const itemObject = JSON.parse(item)
    cart.push(itemObject)
  }
}
//What needs to be displayed, create functions for total quantity and price
function displayItem(item) {
  const article = makeArticle(item)
  const imageDiv = makeImageDiv(item)
  article.appendChild(imageDiv)
  const cardItemContent = makeCartContent(item)
  article.appendChild(cardItemContent)
  displayArticle(article)
  displayTotalQuantity()
  displayTotalPrice()
}
//DISPLAYING THE TOTAL QUANTITY ON THE PAGE
function displayTotalQuantity() {
  const totalQuantity = document.querySelector("#totalQuantity")
  const total = cart.reduce((total, item) => total + item.quantity, 0)
  totalQuantity.textContent = total
}
//DISPLAYING THE TOTAL PRICE ON THE PAGE
function displayTotalPrice() {
  const totalPrice = document.querySelector("#totalPrice")
  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  totalPrice.textContent = total
}
//FUNCTION CREATING THE CONTENT ON THE CART PAGE BY CREATING AN ELEMENT DIV
function makeCartContent(item) {
  const cardItemContent = document.createElement("div")
  cardItemContent.classList.add("cart__item__content")

  const description = makeDescription(item)
  const settings = makeSettings(item)

  cardItemContent.appendChild(description)
  cardItemContent.appendChild(settings)
  return cardItemContent
}
//AS PER HTML, CREATE SETTINGS
function makeSettings(item) {
  const settings = document.createElement("div")
  settings.classList.add("cart__item__content__settings")

  addQuantityToSettings(settings, item)
  addDeleteToSettings(settings, item)
  return settings
}
//CREATE DELETE BUTTON
function addDeleteToSettings(settings, item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__content__settings__delete")
  div.addEventListener("click", () => deleteItem(item))

  const p = document.createElement("p")
  p.textContent = "Supprimer"
  div.appendChild(p)
  settings.appendChild(div)
}
function deleteItem(item) {
  const itemToDelete = cart.findIndex(
    (product) => product.id === item.id && product.color === item.color
  )
  cart.splice(itemToDelete, 1)
  displayTotalPrice()
  displayTotalQuantity()
  deleteDataFromCache(item)
  deleteArticleFromPage(item)
}
//DELETING THE ARTICLE
function deleteArticleFromPage(item) {
  const articleToDelete = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`
  )
  articleToDelete.remove()
}
//CREATING AND APPENDING OF THE REQUIRED ELEMENTS
function addQuantityToSettings(settings, item) {
  const quantity = document.createElement("div")
  quantity.classList.add("cart__item__content__settings__quantity")
  const p = document.createElement("p")
  p.textContent = "Qty : "
  quantity.appendChild(p)
  const input = document.createElement("input")
  input.type = "number"
  input.classList.add("itemQuantity")
  input.name = "itemQuantity"
  input.min = "1"
  input.max = "100"
  input.value = item.quantity
  input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))

  quantity.appendChild(input)
  settings.appendChild(quantity)
}
//UPDAYE OF TOTALS
function updatePriceAndQuantity(id, newValue, item) {
  const itemToUpdate = cart.find((item) => item.id === id)
  itemToUpdate.quantity = Number(newValue)
  item.quantity = itemToUpdate.quantity
  displayTotalQuantity()
  displayTotalPrice()
  saveNewDataToCache(item)
}
//REMOVING DELETED ITEM FROM CACHE
function deleteDataFromCache(item) {
  const key = `${item.id}-${item.color}`
  localStorage.removeItem(key)
}
//SAVE DATA TO CACHE
function saveNewDataToCache(item) {
  const dataToSave = JSON.stringify(item)
  const key = `${item.id}-${item.color}`
  localStorage.setItem(key, dataToSave)
}
//CREATING OF THE ITEM DESCRIPTION AND ELEMENTS
function makeDescription(item) {
  const description = document.createElement("div")
  description.classList.add("cart__item__content__description")

  const h2 = document.createElement("h2")
  h2.textContent = item.name
  const p = document.createElement("p")
  p.textContent = item.color
  const p2 = document.createElement("p")
  p2.textContent = item.price + " €"

  description.appendChild(h2)
  description.appendChild(p)
  description.appendChild(p2)
  return description
}
//DISPLAYING THE ARTICLE AND APPENDING
function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article)
}
//CREATING OF a
function makeArticle(item) {
  const article = document.createElement("article")
  article.classList.add("card__item")
  article.dataset.id = item.id
  article.dataset.color = item.color
  return article
}
//CREATING IMG DIV
function makeImageDiv(item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__img")

  const image = document.createElement("img")
  image.src = item.imageUrl
  image.alt = item.altTxt
  div.appendChild(image)
  return div
}
//SUBMITTING THE FORM AND PASSING IN THE EVENT (E) FROM TOP OF PAGE
function submitForm(e) {
  e.preventDefault()
  if (cart.length === 0) {
    alert("Please select items to buy")
    return
  }

  if (isFormInvalid()) return
  if (isEmailInvalid()) return
//USE 'POST' NOT 'GET' AS WE ARE NOT RETRIEVING INFO, WE ARE SENDING TO THE SERVER,  AND ADD AN OBJECT 
  const body = makeRequestBody()
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }//SHOWING 404 ERROR, MISSED THE 'PRODUCTS IN THE HTTP --FIXED!
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId
      window.location.href = "confirmation.html" + "?orderId=" + orderId
      return console.log(data)
    })
    //show an error if page doesn't load
    .catch((err) => console.error(err))
}
//VERIFY THE EMAIL IS CORRECT USING REGEX
function isEmailInvalid() {
  const email = document.querySelector("#email").value
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
  if (regex.test(email) === false) {
    alert("Please enter valid email")
    return true
  }
  return false
}
//CHECK FORM IS FILLED IN CORRECTLY
function isFormInvalid() {
  const form = document.querySelector(".cart__order__form")
  const inputs = form.querySelectorAll("input")
  inputs.forEach((input) => {
    if (input.value === "") {
      alert("Please fill all the fields")
      return true
    }
    return false
  })
}
//MAKING AN ERROR APPEAR BELOW THE LINE USING EVENT LISTENERS, REGEX, IF, ELSE CONDITIONAL STATEMENTS
//THAT IF IT IS EMPTY THEN DISPLAY MESSAGE AND REGEX TEST
/*MDN ***The test() method executes a search for a match between a regular expression and a specified string. Returns true or false.*/
function getForm() {
  const form = document.querySelector(".cart__order__form");
  
  let emailRegExp = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$");
  let charRegExp = new RegExp("^[a-zA-Z]+$");
  let addressRegExp = new RegExp("^[a-zA-Z0-9 ]+$");

  form.firstName.addEventListener('change', function() {
    validFirstName(this);
  });
  form.lastName.addEventListener('change', function() {
    validLastName(this);
  });
  form.address.addEventListener('change', function() {
    validAddress(this);
  });
  form.city.addEventListener('change', function() {
    validCity(this);
  });
  form.email.addEventListener('change', function() {
    validEmail(this);
  });
  // Name validation
  const validFirstName = function(inputFirstName) {
    let firstNameErrorMessage = inputFirstName.nextElementSibling;
    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMessage.innerHTML = "";
      
    } else {
      firstNameErrorMessage.innerHTML = "Please enter a valid first name";
      
    }
  };
      //surname validation
      const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Please enter a valid last name';
        }
    };

    //address validation
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Please enter a valid address';
        }
    };

    //city validation
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Please enter a valid city';
        }
    };

    //email validation
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Please enter a valid email';
        }
        
    };
    return(form);
    }
    getIdsFromCache()

//MAKING REQUEST BODY
//RECOVERS ORDER ID FOR CONFIRMATION PAGE
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
//I CREATED THE ABOVE PREVIOUSLY FOR THE CLIENT FORM, BUT WITH AN ALERT NOT BELOW THE FIELD, AFTER REMOVING IT THE ORDER NUMBER WOULD NOT SHOW ON THE NEXT PAGE, ONCE MODIFIED AND REPLACED IT WORKS, SO I LEAVE IT LIKE THAT FOR NOW. 


//GETTING IDS FROM CACHE AND BREAK UP THE ORDER NUMBER  
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