<<<<<<< HEAD

//************   SHOPPING CART       ***********/


// Initialize an empty shopping cart array.
const cart = []
// Retrieve items from the browser's local storage and add them to the cart.
retrieveItemsFromCache()
cart.forEach((item) => displayItem(item))
// Find the "Order" button in the HTML and add a click event listener to submit the form.
const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))
// Function to retrieve items from local storage and populate the cart.
function retrieveItemsFromCache() {
  const numberOfItems = localStorage.length
  for (let i = 0; i < numberOfItems; i++) {
    // Retrieve item data from local storage, parse it, and add it to the cart.
    const item = localStorage.getItem(localStorage.key(i)) || ""
    const itemObject = JSON.parse(item)
    cart.push(itemObject)
=======
let cartItems = []

const orderButton = document.getElementById("order");
orderButton.addEventListener("click", (e) => submitForm(e))


function retrieveItemsFromCache() {
  const divCart = document.getElementById("cart__items")


  let keys = Object.keys(localStorage)
  let i = keys.length

  while(i--){
    const key = keys[i]
    const item = JSON.parse(localStorage.getItem(key))
    cartItems.push(item)
>>>>>>> a5ea55180cda05021dfb55a1e13fce2aee3c50c4
  }

cartItems.forEach(async(item) => {
  let price;
  // get unique product
  const res = await fetch("http://localhost:3000/api/products/"+ item.id)
  const data = await res.json()
  price = data.price
  
  // display product details
  divCart.innerHTML += `
  <article class="cart__item" data-id=${item.id} data-color=${item.color}>
            <div class="cart__item__img">
              <img src=${item.imageUrl} alt="Photo of a sofa">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${item.name}</h2>
                <p>${item.color}</p>
                <p>${"€"+price}</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <input type="number" class="itemQuantity" id=${item.id} onchange="changeQuantity(event)" name="itemQuantity" min="1" max="100" value=${item.quantity}>
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem" id=${item.id} onclick="deleteItem(event)">Delete</p>
                  
                </div>
              </div>
            </div>
          </article> 
`
 });
}
<<<<<<< HEAD
// Function to display a single item in the cart.
function displayItem(item) {
  // Create an article element for the item.
  const article = makeArticle(item)
  // Create a div for the item's image and append it to the article.
  const imageDiv = makeImageDiv(item)
   // Create and append the item's content (description and settings) to the article.
  article.appendChild(imageDiv)
  // Display the article on the page.
  const cardItemContent = makeCartContent(item)
  // Update the total quantity and total price displayed on the page.
  article.appendChild(cardItemContent)
  displayArticle(article)
  displayTotalQuantity()
  displayTotalPrice()
}
// Function to display the total quantity of items in the cart.
function displayTotalQuantity() {
  const totalQuantity = document.querySelector("#totalQuantity")
   // Calculate the total quantity by summing the quantities of all items in the cart.
  const total = cart.reduce((total, item) => total + item.quantity, 0)
  totalQuantity.textContent = total
}
// Function to display the total price of items in the cart.
function displayTotalPrice() {
  const totalPrice = document.querySelector("#totalPrice")
  // Calculate the total price by summing the individual prices multiplied by their quantities
  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  totalPrice.textContent = total
}
// Function to create the content (description and settings) of a cart item.
function makeCartContent(item) {
  const cardItemContent = document.createElement("div")
  cardItemContent.classList.add("cart__item__content")
// Create the description and settings elements for the item and append them to the content.
  const description = makeDescription(item)
  const settings = makeSettings(item)

  cardItemContent.appendChild(description)
  cardItemContent.appendChild(settings)
  return cardItemContent
}
// Function to create and set up the settings for a cart item.
function makeSettings(item) {
  const settings = document.createElement("div")
  settings.classList.add("cart__item__content__settings")
// Add quantity input and delete button to the settings.
  addQuantityToSettings(settings, item)
  addDeleteToSettings(settings, item)
  return settings
}
// Function to add a delete button to the settings and set up its click event.
function addDeleteToSettings(settings, item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__content__settings__delete")
  // Add a click event listener to the delete button, which removes the item.
  div.addEventListener("click", () => deleteItem(item))

  const p = document.createElement("p")
  p.textContent = "Supprimer"
  div.appendChild(p)
  settings.appendChild(div)
}
// Function to delete an item from the cart, local storage, and the page.
function deleteItem(item) {
  // Find the index of the item in the cart based on its id and color.
  const itemToDelete = cart.findIndex(
    (product) => product.id === item.id && product.color === item.color
  )
  // Remove the item from the cart and update the displayed total price and quantity.
  cart.splice(itemToDelete, 1)
  displayTotalPrice()
  displayTotalQuantity()
  // Remove the item's data from local storage and its corresponding article from the page.
  deleteDataFromCache(item)
  deleteArticleFromPage(item)
}
// Function to delete an article (item) from the page based on its id and color.
function deleteArticleFromPage(item) {
  const articleToDelete = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`
  )
  articleToDelete.remove()
}
// Function to add a quantity input field to the settings and set up its change event.
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
  // Add an input event listener to update the item's quantity and total price when the value changes.
  input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))

  quantity.appendChild(input)
  settings.appendChild(quantity)
}
// Function to update the item's quantity and total price when the quantity input changes.
function updatePriceAndQuantity(id, newValue, item) {
   // Find the item to update in the cart and update its quantity.
  const itemToUpdate = cart.find((item) => item.id === id)
  itemToUpdate.quantity = Number(newValue)
  item.quantity = itemToUpdate.quantity
  // Update the displayed total quantity and total price, and save the updated data to local storage
  displayTotalQuantity()
  displayTotalPrice()
  saveNewDataToCache(item)
}

// Function to delete item data from the browser's local storage.
function deleteDataFromCache(item) {
  const key = `${item.id}-${item.color}`
=======

// load carts
 retrieveItemsFromCache()
// delete item
 const deleteItem = (event)=>{
  event.preventDefault()//prevents reload the browser on change
  const id = event.target.id

  const findItem = cartItems.find((item)=>item.id === id)

  const key = `${id}-${findItem.color}`

  // remove item from localstorage
>>>>>>> a5ea55180cda05021dfb55a1e13fce2aee3c50c4
  localStorage.removeItem(key)
  location.reload()
 }
// update quantity
const changeQuantity = (event)=>{
  //event.preventDefault()//prevents reload the browser on  direct change
  const newQty = event.target.value
  
  const id = event.target.id
  
  const findItem = cartItems.find((item)=>item.id === id)
  const newItem = {...findItem, quantity: parseInt(newQty)}
  
  const key = `${id}-${newItem.color}`

<<<<<<< HEAD
// Function to save item data to the browser's local storage.
function saveNewDataToCache(item) {
  const dataToSave = JSON.stringify(item)
  const key = `${item.id}-${item.color}`
  localStorage.setItem(key, dataToSave)
}

// Function to create and set up the description element for a cart item.
function makeDescription(item) {
  const description = document.createElement("div")
  description.classList.add("cart__item__content__description")

  // Create and add elements like h2 (name), p (color), and p2 (price) to the description.
  const h2 = document.createElement("h2")
  h2.textContent = item.name
  const p = document.createElement("p")
  p.textContent = item.color
  const p2 = document.createElement("p")
  p2.textContent = item.price + " €"
=======
  // update localstorage with new info
  localStorage.setItem(key, JSON.stringify(newItem))
  
   window.location.reload()
 }


// calculate the total
(()=>{
  const total = document.getElementById("totalPrice")
  const qtyTotal = document.querySelector("#totalQuantity")
  let totalAmount = 0
  let totalQuantity = 0
  cartItems.forEach(async(item)=>{
    const res = await fetch("http://localhost:3000/api/products/"+ item.id )
    const data = await res.json()
>>>>>>> a5ea55180cda05021dfb55a1e13fce2aee3c50c4

    totalAmount += data.price * item.quantity
    total.innerHTML = totalAmount 
    
    totalQuantity += item.quantity
    qtyTotal.innerHTML = totalQuantity
  })
})()

<<<<<<< HEAD
// Function to display an article (cart item) on the webpage.
function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article)
}

// Function to create and set up the article element for a cart item.
function makeArticle(item) {
  const article = document.createElement("article")
  article.classList.add("card__item")
  article.dataset.id = item.id
  article.dataset.color = item.color
  return article
}

// Function to create and set up the image div for a cart item.
function makeImageDiv(item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__img")

  // Create and add an image element, setting its source and alt text.
  const image = document.createElement("img")
  image.src = item.imageUrl
  image.alt = item.altTxt
  div.appendChild(image)
  return div
=======


function getForm() {
  
    let infoForm = document.querySelector(".cart__order__form");
    let mail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
  let charRegExp = new RegExp("^[a-zA-Z]+$");
  let addressRegExp = new RegExp("^[a-zA-Z0-9 ]+$");

    // Ecoute des modifications des éléments du form:
    infoForm.firstName.addEventListener('change', function () {
        validFirstName(this);
    });
    infoForm.lastName.addEventListener('change', function () {
        validLastName(this);
    });
    infoForm.address.addEventListener('change', function () {
        validAddress(this);
    });
    infoForm.city.addEventListener('change', function () {
        validCity(this);
    });
    infoForm.email.addEventListener('change', function () {
        validEmail(this);
    });

    // Validating the form:
    const validFirstName = function (inputFirstName) {
        let firstNameAlertError = inputFirstName.nextElementSibling;
        if (charRegExp.test(inputFirstName.value)) {
            firstNameAlertError.innerHTML = '';
        } else {
            firstNameAlertError.innerHTML = 'Invalid First Name';
        }
    };
    const validLastName = function (inputLastName) {
        let lastNameAlertError = inputLastName.nextElementSibling;
        if (charRegExp.test(inputLastName.value)) {
            lastNameAlertError.innerHTML = '';
        } else {
            lastNameAlertError.innerHTML = 'Invalid Last Name';
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

  const validEmail = function (inputEmail) {
    let emailAlertError = inputEmail.nextElementSibling;
    if (mail.test(inputEmail.value)) {
        emailAlertError.innerHTML = '';
    } else {
        emailAlertError.innerHTML = 'Email invalid';
    }
    };
>>>>>>> a5ea55180cda05021dfb55a1e13fce2aee3c50c4
}
getForm();

// Function to handle form submission when the user clicks the "Order" button.
function submitForm(e) {
<<<<<<< HEAD
  e.preventDefault(); // Prevent the default form submission behavior.

  if (cart.length === 0) {
    alert("Please select items to buy"); // Display an alert if the cart is empty.
    return; // Exit the function to prevent further execution.
  }

  if (isFormInvalid()) return; // Check if the form is invalid and exit if it is.
  if (isEmailInvalid()) return; // Check if the email is invalid and exit if it is.
=======
  e.preventDefault()
  if (cartItems.length === 0) {
    alert("Please select items to buy")
    return
  }


>>>>>>> a5ea55180cda05021dfb55a1e13fce2aee3c50c4

  // Prepare the request body, send a POST request to the server, and handle the response.
  const body = makeRequestBody();
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => res.json())
    .then((data) => {
<<<<<<< HEAD
      const orderId = data.orderId;
      window.location.href = "confirmation.html" + "?orderId=" + orderId; // Redirect to the confirmation page.
      return console.log(data); // Log the response data.
    })
    .catch((err) => console.error(err)); // Handle any errors during the fetch request.
}

// Function to check if the entered email is invalid.
function isEmailInvalid() {
  const email = document.querySelector("#email").value;
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;

  if (regex.test(email) === false) {
    alert("Please enter a valid email"); // Display an alert for an invalid email.
    return true; // Return true to indicate the email is invalid.
  }

  return false; // Return false if the email is valid.
}

// Function to check if the form has empty input fields.
function isFormInvalid() {
  const form = document.querySelector(".cart__order__form");
  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    if (input.value === "") {
      alert("Please fill all the fields"); // Display an alert for empty fields.
      return true; // Return true to indicate the form is invalid.
    }
    return false; // Return false if all fields are filled.
  });
}


// Function to retrieve the form element and set up input validation.
function getForm() {
  const form = document.querySelector(".cart__order__form");

  // Regular expressions for input validation.
  let emailRegExp = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$");
  let charRegExp = new RegExp("^[a-zA-Z]+$");
  let addressRegExp = new RegExp("^[a-zA-Z0-9 ]+$");

  // Event listeners for input fields and their respective validation functions.
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

  // Function for validating the first name input.
  const validFirstName = function(inputFirstName) {
    let firstNameErrorMessage = inputFirstName.nextElementSibling;
    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMessage.innerHTML = "";
    } else {
      firstNameErrorMessage.innerHTML = "Please enter a valid first name";
    }
  };

  // Function for validating the last name input.
  const validLastName = function(inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = '';
    } else {
      lastNameErrorMsg.innerHTML = 'Please enter a valid last name';
    }
  };

  // Function for validating the address input.
  const validAddress = function(inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;
    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = '';
    } else {
      addressErrorMsg.innerHTML = 'Please enter a valid address';
    }
  };
=======
      const orderId = data.orderId
      window.location.href = "confirmation.html" + "?orderId=" + orderId
    })
    .catch((err) => console.error(err))
}

>>>>>>> a5ea55180cda05021dfb55a1e13fce2aee3c50c4

  // Function for validating the city input.
  const validCity = function(inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;
    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = '';
    } else {
      cityErrorMsg.innerHTML = 'Please enter a valid city';
    }
  };

  // Function for validating the email input.
  const validEmail = function(inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;
    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = '';
    } else {
      emailErrorMsg.innerHTML = 'Please enter a valid email';
    }
  };

  return form;
}

// Function to get product IDs from local storage.
function getIdsFromCache() {
  const numberOfProducts = localStorage.length;
  const ids = [];
  for (let i = 0; i < numberOfProducts; i++) {
    const key = localStorage.key(i);
    const id = key.split("-")[0]; // Split the key to get the product ID.
    ids.push(id);
  }
  return ids;
}

// Function to create the request body for submitting the order.
function makeRequestBody() {
  const form = document.querySelector(".cart__order__form");
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;
  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
<<<<<<< HEAD
      email: email,
    },
    products: getIdsFromCache(),
  };
  return body;
}
=======
      email: email
    },
    products: getIdsFromCache()
  }
  return body
}

function getIdsFromCache() {
  const numberOfProducts = localStorage.length
  const ids = []
  for (let i = 0; i < numberOfProducts; i++) {
    const key = localStorage.key(i)
    const id = key.split("-")[0]
    ids.push(id)
  }
  return ids
}
>>>>>>> a5ea55180cda05021dfb55a1e13fce2aee3c50c4
