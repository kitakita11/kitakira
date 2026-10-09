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

//====== 3D DESIGN ==========

const IMAGES = [
    "../img/design-23.png",
    "../img/design-12.png",
    "../img/design-3.png",
    "../img/design-2.png",
    "../img/design-20.png",
    "../img/design-30.png",
    "../img/design-17.png",
    "../img/design-24.png",
    "../img/design-11.png",
    "../img/design-8.png",
    "../img/design-10.png",
    "../img/design-6.png",
    "../img/design-21.png",
    "../img/design-30.png",
    "../img/design-22.png",
    "../img/design-1.png",
    "../img/design19.png",
    "../img/design-4.png",
    "../img/design-9.png",
];
const sceneDom = document.getElementById("photo");
const count = IMAGES.length;
const ringRadius = 600; //圆环半径，调大圈变大

IMAGES.forEach((src, idx) => {
    const card = document.createElement("div");
    card.className = "photo-card";
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    card.appendChild(img);

    const angle = (idx / count) * Math.PI * 2;
    const offsetX = Math.cos(angle) * ringRadius;
    const offsetY = Math.sin(angle) * ringRadius * 0.3;
    const offsetZ = (Math.random() - 0.5) * 100;

    card.style.setProperty("--final-pos", `translate3d(${offsetX}px,${offsetY}px,${offsetZ}px)`);
    card.style.animationDelay = `${idx * 0.10}s`;

    // hover层级
    card.addEventListener("mouseenter", function () {
        this.style.zIndex = 999;
    });
    card.addEventListener("mouseleave", function () {
        this.style.zIndex = 1;
    });

    sceneDom.appendChild(card);
});

// ========== 旋转木马360无限公转 + lerp平滑 ==========
let baseAngle = 0;
const swingSpeed = 0.025 // 旋转速度，0.08很慢，0.2稍快
let targetRotateY = 0;
let targetRotateX = 0;
let currentRotateY = 0;
let currentRotateX = 0;
const ease = 0.06; // 平滑回弹系数

function animateScene() {
    //持续公转
    baseAngle += swingSpeed;
    targetRotateY = baseAngle;

    //lerp缓动
    currentRotateY += (targetRotateY - currentRotateY) * ease;
    currentRotateX += (targetRotateX - currentRotateX) * ease;

    sceneDom.style.transform = `rotateY(${currentRotateY}deg) rotateX(${currentRotateX}deg)`;
    
    requestAnimationFrame(animateScene);
}
animateScene();

//鼠标视差叠加
window.addEventListener("mousemove", (e) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const mx = (e.clientX / w - 0.5) * 5;
    const my = (e.clientY / h - 0.5) * -8;
    targetRotateY = baseAngle + mx;
    targetRotateX = my;
});

//鼠标离开只清除X视差，不打断旋转
window.addEventListener("mouseleave", () => {
    targetRotateX = 0;
});
