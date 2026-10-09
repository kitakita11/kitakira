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


// ==========cart page ==========
let cart = JSON.parse(localStorage.getItem('crystalCart')) || [];
const cartEmptyEl = document.getElementById('cart-empty');
const cartContainerEl = document.getElementById('cart-container');
const cartItemsEl = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const clearCartBtn = document.getElementById('clear-cart');

// cart style
function renderCart() {
if (cart.length === 0) {
cartEmptyEl.style.display = 'block';
cartContainerEl.style.display = 'none';
totalPriceEl.textContent = 'HK$0.00';
return;
}
cartEmptyEl.style.display = 'none';
cartContainerEl.style.display = 'block';
cartItemsEl.innerHTML = '';
let total = 0;
cart.forEach((item, index) => {
total += item.price * item.quantity;
const cartItem = document.createElement('div');
cartItem.className = 'cart-item';
cartItem.innerHTML = `
        <div class="cart-item-img">
        <img src="${item.img}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>HK$${item.price.toFixed(2)}</p>
        <div class="quantity-wrap">
            <button class="qty-minus" data-index="${index}">-</button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-plus" data-index="${index}">+</button>
        </div>
        </div>
        <button class="remove-item" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
    `;
cartItemsEl.appendChild(cartItem);
});
totalPriceEl.textContent = `HK$${total.toFixed(2)}`;

// save --> crystalCart
localStorage.setItem('crystalCart', JSON.stringify(cart));
}

// add item + or -
cartItemsEl.addEventListener('click', (e) => {
const btn = e.target.closest('[data-index]');
if (!btn) return;
const index = btn.dataset.index;

if (btn.classList.contains('qty-minus')) {
cart[index].quantity--;
if(cart[index].quantity <= 0){
  cart.splice(index,1);
}
renderCart();
}
if (btn.classList.contains('qty-plus')) {
cart[index].quantity++;
renderCart();
}
if (btn.classList.contains('remove-item')) {
cart.splice(index, 1);
renderCart();
}
});

// clear cart
clearCartBtn.addEventListener('click', () => {
cart = [];
renderCart();
});

window.addEventListener('DOMContentLoaded', renderCart);