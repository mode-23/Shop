// var next = document.getElementById("next");
// var prev = document.getElementById("prev");
// var imgHolder = document.querySelector(".img-holder");
// var img = document.querySelector(".img");
// let widthImg = img.clientWidth;
// prev.addEventListener("click", () => {
//   imgHolder.scrollLeft -= widthImg; 
// });
// next.addEventListener("click", () => {
//   imgHolder.scrollLeft += widthImg;
// });
let body = document.getElementsByTagName("body")[0];
var cart = document.getElementById("cart");
var innerCart = document.querySelector(".inner-cart");
cart.addEventListener("click", () => {
  innerCart.classList.toggle("visible");
});
var closeCart = document.getElementById("close-cart");
closeCart.addEventListener("click", () => {
  innerCart.classList.remove("visible");
});
var numberOfProducts = document.querySelector(".numberOfProducts");
numberOfProducts.addEventListener("click", () => {
  innerCart.classList.toggle("visible");
});
//CART
var removeItemButtons = document.getElementsByClassName("btnDelete");
for (var i = 0; i < removeItemButtons.length; i++) {
  removeItemButtons[i].addEventListener("click", function (e) {
    e.target.parentElement.parentElement.remove();
    updateToCart();
    updateCartCount();
  });
}
var quantityInputs = document.getElementsByClassName("count-cart");
for (var i = 0; i < quantityInputs.length; i++) {
  quantityInputs[i].addEventListener("change", quantityChanged);
}
var addtoCart = document.getElementsByClassName("addtoCart");
for (var i = 0; i < addtoCart.length; i++) {
  addtoCart[i].addEventListener("click", addtoCartClicked);
}
// var added = document.querySelector('.added');
function addtoCartClicked(e) {
  var shopElement = e.target.parentElement.parentElement;
  var title = shopElement.getElementsByClassName("title")[0].innerText;
  var price = shopElement.getElementsByClassName("price")[0].innerText;
  var imgsrc = shopElement.getElementsByClassName("shopImg")[0].src;
  addtoCartItems(title, price, imgsrc);
  updateToCart();
  // added.classList.add("warned");
  // setTimeout(() =>{
  //   added.classList.remove("warned");
  //   }, 4000);
}
var popAlert = document.querySelector('.alert');
var closeAlert = document.querySelector('#closeAlert');
popAlert.addEventListener('click', ()=>{
  popAlert.classList.remove('warned');
});
closeAlert.addEventListener('click', ()=>{
  popAlert.classList.remove('warned');
});
function addtoCartItems(title, price, imgsrc) {
  var cartrow = document.createElement("div");
  cartrow.classList.add("cart-box");
  var cartContaineritems =
    document.getElementsByClassName("cart-box-holder")[0];
  var cartitemsNames = cartContaineritems.getElementsByClassName('title-cart');
  for(var i = 0 ; i < cartitemsNames.length; i++){
    if(cartitemsNames[i].innerText == title){
      popAlert.classList.add('warned');
      return
    }
  }
  var cartcontent = `
          <div class="cart-img">
          <img src="${imgsrc}">
          </div>
          <h4 class="title-cart">${title}</h4>
          <p class="price-cart">${"$" + price}</p>
          <input type="number" class="count-cart" value="1">
          <span class="remove-cart"><i class="fa-solid fa-xmark btnDelete"></i></span>
`;
  updateCartCount();
  cartrow.innerHTML = cartcontent;
  cartContaineritems.append(cartrow);
  cartrow.getElementsByClassName("btnDelete")[0].addEventListener("click", function (ev) {
      for (var i = 0; i < removeItemButtons.length; i++) {
        removeItemButtons[i].addEventListener("click", function (ex) {
          ex.target.parentElement.parentElement.remove();
          updateToCart();
        });
      }
    });
  cartrow.getElementsByClassName("count-cart")[0].addEventListener("change", quantityChanged);
}
function updateCartCount() {
  var arrayofcart = document.querySelectorAll(".cart-box");
  var numberOfProducts = document.querySelector(".numberOfProducts");
  numberOfProducts.innerHTML = arrayofcart.length + 1;
}
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateToCart();
}
//total
function updateToCart() {
  var cartContainer = document.getElementsByClassName("cart-box-holder")[0];
  var cartRows = cartContainer.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var priceElement = cartRows[i].getElementsByClassName("price-cart")[0];
    var quantityElement = cartRows[i].getElementsByClassName("count-cart")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total += price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  if (total > 0) {
    document.getElementsByClassName("price-out")[0].innerText = "$" + total;
  } else {
    document.getElementsByClassName("price-out")[0].innerText = "Empty";
    if (document.getElementsByClassName("price-out")[0].innerText == "Empty") {
      document.getElementsByClassName("price-out")[0].style.color = "#535353";
      document.getElementsByClassName("numberOfProducts")[0].innerText = "0";
    } else {
      document.getElementsByClassName("price-out")[0].style.color = "#00a4e4";
    }
  }
}
// function checknewProduct() {
//   var cartShop = document.getElementsByClassName("cartShop");
//   for (var i = 0; i < cartShop.length; i++) {
//     if (cartShop[i].classList.contains == "newPro") {
//       cartShop[i].innerHTML += '<span class="new-div">new</span>';
//     }
//   }
// }
// checknewProduct();
let toggle = document.querySelector(".toggle");
let menu = document.querySelector(".main");
toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  menu.classList.toggle("active");
  body.classList.toggle("fixed");
});

let lis = document.querySelectorAll(".main li");
let searchExtra = document.querySelector("#searchExtra");
let searchIcon = document.querySelector("#searchIcon");
let search = document.querySelector("#search");
searchExtra.addEventListener("click", function () {
  this.classList.add("active");
  searchIcon.classList.add("active");
  search.classList.add("active");
});

lis.forEach((li) => {
  li.addEventListener("click", removeActivetwo);
});

function removeActivetwo() {
  lis.forEach((li) => {
    li.classList.remove("active");
    this.classList.add("active");
    menu.classList.remove("active");
    toggle.classList.remove("active");
    body.classList.remove("fixed");
  });
}
var listFilter = document.getElementById("listFilter");
var comFilter = document.getElementById("comFilter");
var boxHolder = document.getElementsByClassName("box-holder");
listFilter.addEventListener("click", function () {
  listFilter.classList.add("active");
  comFilter.classList.remove("active");
  for (var i = 0; i < boxHolder.length; i++) {
    boxHolder[i].classList.add("active");
  }
});
comFilter.addEventListener("click", function () {
  comFilter.classList.add("active");
  listFilter.classList.remove("active");
  for (var x = 0; x < boxHolder.length; x++) {
    boxHolder[x].classList.remove("active");
  }
});
let header = document.querySelector(".header");
let logo = document.querySelector(".logo");
window.addEventListener("scroll", () => {
  if (this.scrollY > 0) {
    header.classList.add("sticky");
    logo.innerHTML = '<i class="fa-solid fa-house"></i>';
  } else {
    header.classList.remove("sticky");
    logo.innerHTML = "Mode<span>fy</span>";
  }
});
let scrollTotop = document.querySelector(".scrollTotop");
window.addEventListener("scroll", () => {
  if (this.scrollY >= 500) {
    scrollTotop.classList.add("showup");
  } else {
    scrollTotop.classList.remove("showup");
  }
});
scrollTotop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
window.addEventListener('scroll', ()=>{
  if(this.scrollY > 0 ){
    if(menu.classList.contains = 'active');
      menu.style.top = 49 + 'px';
  }else{
    menu.style.top = 57 + 'px';
  }
})
window.addEventListener('scroll', ()=>{
  if(this.innerWidth > 767){
    if(this.scrollY > 0 ){
      innerCart.style.top = 46 + 'px';
    }else{
      innerCart.style.top = 57 + 'px';
    }
  }
})
// var allProducts = document.getElementsByClassName('cartShop').length;
// var pc = document.getElementsByClassName('pcs').length;
// var cl = document.getElementsByClassName('cl').length;
// var ph = document.getElementsByClassName('ph').length;
// var pcbox = document.getElementById('pc');
// var clbox = document.getElementById('cl');
// var phbox = document.getElementById('ph');
// var allpr = document.getElementById('allpr');
// pcbox.innerHTML = pc;
// clbox.innerHTML = cl;
// phbox.innerHTML = ph;
// allpr.innerHTML = allProducts;
var droping = document.querySelector('.droping');
var innerDrop = document.querySelector('.innerDrop');
var iconof = document.querySelector('#iconof');
droping.addEventListener('click', ()=>{
  innerDrop.classList.toggle('active');
  iconof.classList.toggle('active');
});
var i = 0;
var imagesArr = ['phone2.jpg' , 's3.jpg' , 's4.jpg' , 't4.jpg'];
var time = 10000;
var filterImgs = document.getElementById('filterImgs');
var prevFilter = document.getElementById('prevFilter');
var nextFilter = document.getElementById('nextFilter');
function changeImg(){
  filterImgs.src = `images/${imagesArr[i]}`;
  if(i < imagesArr.length - 1){
    i++;
  }else{
    i = 0
  }
  setTimeout('changeImg()', time);
}
changeImg();
nextFilter.addEventListener('click', ()=>{
  if(i < imagesArr.length - 1){
    i++;
  }else{
    i = 0
  }
  filterImgs.src = `images/${imagesArr[i]}`;
});
prevFilter.addEventListener('click', ()=>{
  if(i != 0){
    i--;
  }else{
    i = imagesArr.length - 1;
  }
  filterImgs.src = `images/${imagesArr[i]}`;
});
//localstorage
let mood = document.querySelector('.mood');
let bodys = document.querySelector('.body');
let lightMode = localStorage.getItem("lightMode"); 

const enableLightMode = () => {
  mood.classList.add('active');
  bodys.classList.add('lightTheme');
  localStorage.setItem("lightMode", "enabled");
};
var load = document.querySelector('.preload')
window.addEventListener('load', ()=>{
  load.classList.add('loaded');
})
const disableLightMode = () => {
  mood.classList.remove('active');
  bodys.classList.remove('lightTheme');
  localStorage.setItem("lightMode", "disabled");
};

if (lightMode === "enabled") {
  enableLightMode();
}

mood.addEventListener("click", () => {
  lightMode = localStorage.getItem("lightMode");
  if (lightMode !== "enabled") {
    enableLightMode();
    mood.title = 'LIGHTMODE';
  } else {
    disableLightMode();
    mood.title = 'DARKMODE';
  }
});