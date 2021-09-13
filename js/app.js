// API Data fetch 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <div class="card-body">
      <h5>${product.title}</h5>
      <p><b>Category:</b> ${product.category}</p>
      <div class="card-details">
      <div class="rating-star">
      <span class="fw-bold">${product.rating.rate} </span>
       ${changeStar(product.rating.rate, product.rating.count)}
       <span class="text-muted"> (${product.rating.count})</span>
       </div>
      </div>
      <h4>Price: $ ${product.price}</h4>
      </div>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn"><i class="fas fa-cart-plus"></i> Add to cart</button>
      <button id="details-btn" class="btn details-btn" onclick="displayProductDetails('${product.title}', '${product.description}')" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-eye"></i> Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// Price Count 
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};
// Input value Taken 
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// modalConent
const displayProductDetails = (title, description) => {
  const modalDialog = document.getElementsByClassName('modal-dialog')[0]
  modalDialog.innerHTML = '';
  const modalConent = `
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ${description}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  `
  modalDialog.innerHTML = modalConent;
}

//Start marking
const changeStar = (rate) => {
  let fullFilledStar = parseInt(rate);
  let starPart = parseInt((rate + "").split(".")[1]) || 0;

  let star = '';
  for (let i = 0; i<fullFilledStar; i++){
    star += '<i class="fas fa-star"></i> ';
  }
  if (starPart < 8 && starPart > 2){
    star += '<i class="fas fa-star-half-alt"></i> ';
    fullFilledStar += 1;
  }
  else if(starPart > 7){
    star += '<i class="fas fa-star"></i> ';
    fullFilledStar += 1;
  }
  for (let j = fullFilledStar; j < 5; j++) {
    star += '<i class="far fa-star"></i> ';
  }
  return star;
}