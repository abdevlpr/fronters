"use strict";
const carImg = document.getElementById("img-car");
const truckImg = document.getElementById("img-truck");
const anchors = document.getElementsByTagName("a");
const addProductItem = document.getElementById("add-product");

getAllProducts();

// Make sure all anchors that has http target is blank
// Good ux practice is to open another tab for external links
for (let index = 0; index < anchors.length; index++) {
  const element = anchors[index];
  const getHref = element.getAttribute("href");
  if (getHref && getHref.includes("http")) {
    element.setAttribute("target", "_blank");
  }
}

// Change the car imgs position based on the scroll event on the document
document.addEventListener("scroll", () => {
  carImg.style.left = `${(window.scrollY - 2500) / 2}px`;
  truckImg.style.left = `${(window.scrollY - 2000) / 2}px`;
});

function handleChangeTheme(theme) {
  const dark = document.getElementById("dark");
  const moon = document.getElementById("moon");
  if (theme === "dark") {
    document.body.style = "--background-dark:#0f141a";
    dark.classList.add("active");
    moon.classList.remove("active");
  } else if (theme === "moon") {
    document.body.style = "--background-dark:#232c36";
    moon.classList.add("active");
    dark.classList.remove("active");
  }
}

function handleAddProduct() {
  addProduct({
    id: 10,
    title: "HP Pavilion 15-DK1056WM",
    price: 1099,
    thumbnail: "https://cdn.dummyjson.com/product-images/10/thumbnail.jpeg",
  });
}

function getAllProducts() {
  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((productsArr) => {
      for (let index = 0; index < 3; index++) {
        handleAddProductToDom(productsArr.products[index]);
      }
    })
    .catch((error) => console.error(error));
}

function addProduct(productData) {
  fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      addProductItem.classList.add("product");
      addProductItem.innerHTML = `
      <a class="gradient-grey" href="">
      <img
        src="${data.thumbnail}"
        alt="${data.title}"
      />
      <div class="product-bottom">
        <h3>${data.title}</h3>
        <p>$ ${data.price}</p>
      </div>
    </a>
      `;
    });
}

function handleAddProductToDom(product) {
  const productsContainer = document.getElementById("products");
  if (product) {
    const li = document.createElement("li");
    li.innerHTML = `
        <li class="product">
                <a class="gradient-grey" href="">
                  <img
                    src="${product.thumbnail}"
                    alt="${product.title}"
                  />
                  <div class="product-bottom">
                    <h3>${product.title}</h3>
                    <p>$ ${product.price}</p>
                  </div>
                </a>
              </li>
        `;
    productsContainer.insertBefore(
      li,
      productsContainer.children[productsContainer.children.length - 1]
    );
  }
}
