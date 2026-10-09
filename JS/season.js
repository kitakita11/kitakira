// ========== burger Design JS==========
const hamburgerBtn = document.querySelector(".fa-bars");
const sidebar = document.querySelector(".mobile-sidebar");
const overlay = document.querySelector(".sidebar-overlay");
const closeBtn = document.querySelector(".close-btn");
const mobileFiveElement = document.querySelector(".five-element-mobile");
const mobileSubMenu = document.querySelector(".element-submenu-mobile");

// Open sidebar
hamburgerBtn.addEventListener("click", () => {
    sidebar.classList.add("show");
    overlay.classList.add("show");
});

// Close sidebar
function closeSidebar(){
    sidebar.classList.remove("show");
    overlay.classList.remove("show");
    mobileSubMenu.classList.remove("open");
}
closeBtn.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);

// Mobile Five Element dropdown toggle
mobileFiveElement.addEventListener("click",(e)=>{
    e.preventDefault();
    mobileSubMenu.classList.toggle("open");
})


/*====================*/
/* =====cart ========*/
/*====================*/

function getCart() {
    return JSON.parse(localStorage.getItem('crystalCart')) || [];
}
function saveCart(cart) {
    localStorage.setItem('crystalCart', JSON.stringify(cart));
}
// add to cart
function addToCart(product) {
const cart = getCart();
const findItem = cart.find(item => item.name === product.name);
if(findItem){
findItem.quantity += 1; 
}else{
cart.push({...product, quantity:1});
}
saveCart(cart);
alert("✅ Good Choose!! Added to cart!");
}
// cart btn
document.querySelectorAll('.add-cart-btn').forEach(btn => {
btn.addEventListener('click', ()=>{
const product = {
name: btn.dataset.name,
price: Number(btn.dataset.price),
img: btn.dataset.img
}
addToCart(product);
})
})


