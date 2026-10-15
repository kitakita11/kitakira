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
const sceneDom = document.getElementById("photo");
if(sceneDom){
const IMAGES = [
"./img/design-aquarius.jpeg",
"./img/design-cancer.png",
"./img/design-aries.png",
"./img/design-cp.png",
"./img/design-capricorn.png",
"./img/design-pisces.jpeg",
"./img/design-scorpio.jpeg",
"./img/design-summer.png",
"./img/design-gemini.png",
"./img/design-leo.png",
"./img/design-10.png",
];
const count = IMAGES.length;

// B：圆环基础半径，大屏默认，移动端自动缩小
let ringRadius = 500;
if(window.innerWidth <768){
    ringRadius = 200;
}

IMAGES.forEach((src, idx) => {
    const card = document.createElement("div");
    card.className = "photo-card";
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Crystal Bracelet";
    card.appendChild(img);

  const angle = (idx / count) * Math.PI * 2;
  const offsetX = Math.cos(angle) * ringRadius;
  // B：上下波浪起伏，数字越大起伏越剧烈
  const offsetY = Math.sin(angle * 2) * 60;
  const offsetZ = Math.sin(angle) * ringRadius;

  // A：卡片自身反向旋转，让图片永远朝向镜头
  const cardRotateY = -angle * (180 / Math.PI);
    card.style.setProperty("--final-pos", `translate3d(${offsetX}px,${offsetY}px,${offsetZ}px) rotateY(${cardRotateY}deg)`);
  card.style.animationDelay = `${idx * 0.08}s`;

  // D：hover层级优化，移入置顶，移出延迟恢复，消除闪烁遮挡
    card.addEventListener("mouseenter", function () {
    this.style.zIndex = 999;
    });
    card.addEventListener("mouseleave", function () {
    setTimeout(()=>{
        this.style.zIndex = 1;
    }, 350) // 和css transition时间匹配，等缩放动画结束再降层级
    });
    sceneDom.appendChild(card);
});

// ========== 旋转木马360无限公转 ==========
let baseAngle = 0;
// 基础公转速度，越小越慢优雅
const swingSpeed = 0.095
let targetRotateY = 0;
let currentRotateY = 0;
const ease = 0.05; // 平滑回弹，越小越顺滑
const sceneTranslateZ = -180; // 场景向前推，负数越大越靠近镜头

function animateScene() {
    baseAngle += swingSpeed;
    targetRotateY = baseAngle;

  //lerp缓动
  currentRotateY += (targetRotateY - currentRotateY) * ease;
  // 整体前移translateZ，只保留公转，删除鼠标X/Y视差
    sceneDom.style.transform = `translateZ(${sceneTranslateZ}px) rotateY(${currentRotateY}deg)`;
    requestAnimationFrame(animateScene);
}
animateScene();

// 窗口大小变化时重新计算圆环半径（适配窗口缩放）
window.addEventListener('resize', ()=>{
    ringRadius = window.innerWidth <768 ? 200 : 500;
    const cards = document.querySelectorAll('.photo-card');
    cards.forEach((card, idx)=>{
    const angle = (idx / count) * Math.PI * 2;
    const offsetX = Math.cos(angle) * ringRadius;
    const offsetY = Math.sin(angle * 2) * 60;
    const offsetZ = Math.sin(angle) * ringRadius;
    const cardRotateY = -angle * (180 / Math.PI);
    card.style.setProperty("--final-pos", `translate3d(${offsetX}px,${offsetY}px,${offsetZ}px) rotateY(${cardRotateY}deg)`);
    })
})
}