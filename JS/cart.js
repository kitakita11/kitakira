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

function getCart() {
    return JSON.parse(localStorage.getItem('crystalCart')) || [];
}
function saveCart(cart) {
    localStorage.setItem('crystalCart', JSON.stringify(cart));
}

// 用ID匹配你html里的元素
const cartItemsEl = document.getElementById('cart-items');
const totalEl = document.getElementById('total-price');
const clearCartBtn = document.getElementById('clear-cart');
const cartEmptyEl = document.getElementById('cart-empty');
const cartContainerEl = document.getElementById('cart-container');

function renderCart() {
    const cart = getCart();
    cartItemsEl.innerHTML = '';
    let total = 0;

  // 【空购物车判断】
if (cart.length === 0) {
    cartEmptyEl.style.display = "block";
    cartContainerEl.style.display = "none";
    totalEl.textContent = "HK$0.00";
    return;
    }
    else{
    cartEmptyEl.style.display = "none";
    cartContainerEl.style.display = "block";
    }

cart.forEach((item, index) => {
    const qty = Number(item.quantity ?? 1);
    const price = Number(item.price ?? 0);
    const lineTotal = price * qty;
    const isGitHubPage = window.location.hostname.endsWith('.github.io');

    total += lineTotal;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <div class="cart-item-img">
        <img src="${item.type === 'custom bracelet' ? item.previewImage : (isGitHubPage?'/kitakira'+item.img: item.img)}" alt="${item.name || item.zodiac + ' Bracelet'}">
        </div>
        <div class="cart-item-info">
        <h3>${item.type === 'custom bracelet' ? `Custom ${item.zodiac} Bracelet` : item.name}</h3>
        <p>HK$${price.toFixed(2)}</p>
        <div class="quantity-wrap">
            <button class="qty-minus" data-index="${index}">-</button>
            <span class="qty-num">${qty}</span>
            <button class="qty-plus" data-index="${index}">+</button>
        </div>
        </div>
        <button class="remove-item" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
    `;
    cartItemsEl.appendChild(cartItem);
    });

  // total price HK$
totalEl.textContent = `HK$${total.toFixed(2)}`;

  // cart crystal -
document.querySelectorAll('.qty-minus').forEach(btn => {
    btn.onclick = () => {
        const idx = Number(btn.dataset.index);
        if(cart[idx].quantity > 1){
        cart[idx].quantity -= 1;
        saveCart(cart);
        renderCart();
        }
    }
    })
   // cart crystal +
document.querySelectorAll('.qty-plus').forEach(btn => {
    btn.onclick = () => {
        const idx = Number(btn.dataset.index);
        cart[idx].quantity += 1;
        saveCart(cart);
        renderCart();
    }
    })
  // DEL crystal
document.querySelectorAll('.remove-item').forEach(btn => {
    btn.onclick = () => {
        const idx = Number(btn.dataset.index);
        cart.splice(idx,1);
        saveCart(cart);
        renderCart();
    }
    })
}

// clear cart
clearCartBtn.onclick = ()=>{
    localStorage.removeItem("crystalCart");
    renderCart();
}

window.onload = renderCart;
