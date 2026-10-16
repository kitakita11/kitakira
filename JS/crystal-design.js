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

// ===================== 购物车公共函数（和商品列表页保持一致） =====================
function getCart() {
  return JSON.parse(localStorage.getItem('crystalCart')) || [];
}
function saveCart(cart) {
  localStorage.setItem('crystalCart', JSON.stringify(cart));
}

//========================= Crystal Bracelet Customizer ======================
// ================= Global Crystal Color Mapping =================
const crystalDotColors = {
"Red Agate": "#e57373",
"Sunstone": "#ffb74d",
"Tiger Eye": "#d4a017",
"Aquamarine": "#80deea",
"Clear Quartz": "#e0f7fa",
"Green Phantom": "#66bb6a",
"Smoky Quartz": "#757575",
"Rose Quartz": "#f48fb1",
"Citrine": "#fff176",
"Lapis Lazuli": "#4d69d4",
"Fluorite": "#ba68c8",
"Amethyst": "#ab47bc",
"Moonstone": "#b3e5fc",
"Rutilated Quartz": "#ffd54f",
"Prehnite": "#aed581",
"Labradorite": "#5c6bc0",
"Obsidian": "#212121",
"Garnet": "#c62828",
"Black Rutilated": "#333333",
"Blue Lace Agate": "#90b8e8"
};
// 12 Zodiac Data (5 crystals per zodiac from reference image)
const zodiacList = [
  {
name:"Aries",symbol:"♈",start:"03-21",end:"04-19",
crystals:["Red Agate","Sunstone","Tiger Eye","Aquamarine","Clear Quartz"]
},
  {
name:"Taurus",symbol:"♉",start:"04-20",end:"05-20",
crystals:["Green Phantom","Smoky Quartz","Rose Quartz","Citrine","Clear Quartz"]
},
  {
name:"Gemini",symbol:"♊",start:"05-21",end:"06-21",
crystals:["Aquamarine","Lapis Lazuli","Fluorite","Amethyst","Clear Quartz"]
},
  {
name:"Cancer",symbol:"♋",start:"06-22",end:"07-22",
crystals:["Moonstone","Rose Quartz","Aquamarine","Smoky Quartz","Clear Quartz"]
},
  {
name:"Leo",symbol:"♌",start:"07-23",end:"08-22",
crystals:["Citrine","Rutilated Quartz","Sunstone","Red Agate","Clear Quartz"]
},
  {
name:"Virgo",symbol:"♍",start:"08-23",end:"09-22",
crystals:["Clear Quartz","Fluorite","Blue Lace Agate","Amethyst","Smoky Quartz"]
},
  {
name:"Libra",symbol:"♎",start:"09-23",end:"10-23",
crystals:["Rose Quartz","Aquamarine","Prehnite","Clear Quartz","Moonstone"]
},
  {
name:"Scorpio",symbol:"♏",start:"10-24",end:"11-22",
crystals:["Obsidian","Amethyst","Labradorite","Garnet","Black Rutilated"]
},
  {
name:"Sagittarius",symbol:"♐",start:"11-23",end:"12-21",
crystals:["Lapis Lazuli","Sunstone","Tiger Eye","Smoky Quartz","Aquamarine"]
},
  {
name:"Capricorn",symbol:"♑",start:"12-22",end:"01-19",
crystals:["Smoky Quartz","Black Rutilated","Tiger Eye","Clear Quartz","Obsidian"]
},
  {
name:"Aquarius",symbol:"♒",start:"01-20",end:"02-18",
crystals:["Fluorite","Labradorite","Aquamarine","Amethyst","Clear Quartz"]
},
  {
name:"Pisces",symbol:"♓",start:"02-19",end:"03-20",
crystals:["Moonstone","Amethyst","Rose Quartz","Aquamarine","Obsidian"]
}
];
// ========== Canvas Bracelet Preview Renderer ==========
const canvas = document.getElementById("braceletCanvas");
const ctx = canvas.getContext("2d");
const limitedGlowColor = "rgba(255, 180, 80, 0.35)";
const limitedExtraPrice = 25; // Autumn limited +25
// Package price rules
function getPackagePrice(count){
if(count >=8 && count <=12) return 388;
if(count >=13 && count <=18) return 688;
if(count >=19 && count <=21) return 1080;
return null; // Not match package
}
// Draw bracelet preview ring
function drawBraceletPreview() {
const w = canvas.width;
const h = canvas.height;
const cx = w / 2;
const cy = h / 2;
ctx.clearRect(0, 0, w, h);
drawModalBackground(cx, cy);
if (braceletCrystals.length === 0) return;
const total = braceletCrystals.length;
const ringRadius = 130;
const beadRadius = 22;
const startAngle = -Math.PI / 2;
for (let i = 0; i < total; i++) {
const angle = startAngle + (i / total) * 2 * Math.PI;
const x = cx + ringRadius * Math.cos(angle);
const y = cy + ringRadius * Math.sin(angle);
const color = crystalDotColors[braceletCrystals[i]] || "#b0b0b0";
drawBead(x, y, beadRadius, color, i, total);
  }
drawCenterBadge(cx, cy);
if (isLimitedCrystalCheck.checked) {
drawLimitedGlow(cx, cy, ringRadius + beadRadius + 18);
  }
}
function drawModalBackground(cx, cy) {
const bg = ctx.createRadialGradient(cx, cy, 40, cx, cy, 260);
bg.addColorStop(0, "#2a1560");
bg.addColorStop(1, "#070220");
ctx.fillStyle = bg;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "rgba(255,255,255,0.08)";
for (let i = 0; i < 40; i++) {
const x = Math.random() * canvas.width;
const y = Math.random() * canvas.height;
ctx.beginPath();
ctx.arc(x, y, 0.8, 0, Math.PI * 2);
ctx.fill();
  }
}
function drawBead(x, y, radius, color, index, total) {
ctx.beginPath();
ctx.arc(x + 2, y + 3, radius, 0, Math.PI * 2);
ctx.fillStyle = "rgba(0,0,0,0.35)";
ctx.fill();
const grad = ctx.createRadialGradient(x - 6, y - 8, 4, x, y, radius);
grad.addColorStop(0, lightenColor(color, 40));
grad.addColorStop(0.55, color);
grad.addColorStop(1, darkenColor(color, 25));
ctx.beginPath();
ctx.arc(x, y, radius, 0, Math.PI * 2);
ctx.fillStyle = grad;
ctx.fill();
ctx.beginPath();
ctx.arc(x - 7, y - 9, 7, 0, Math.PI * 2);
ctx.fillStyle = "rgba(255,255,255,0.45)";
ctx.fill();
if ((index + 1) % 3 === 0) {
drawGoldSpacer(x, y, radius);
  }
}
function drawGoldSpacer(x, y, beadRadius) {
ctx.save();
ctx.translate(x, y);
ctx.rotate(Math.PI / 6);
const spacerW = 10;
const spacerH = beadRadius + 4;
const grad = ctx.createLinearGradient(-spacerW/2, 0, spacerW/2,0);
grad.addColorStop(0, "#8a6220");
grad.addColorStop(0.5, "#ffd86b");
grad.addColorStop(1, "#8a6220");
ctx.fillStyle = grad;
ctx.fillRect(-spacerW / 2, -spacerH / 2, spacerW, spacerH);
ctx.strokeStyle = "#5c4418";
ctx.lineWidth =1;
ctx.strokeRect(-spacerW / 2, -spacerH / 2, spacerW, spacerH);
ctx.restore();
}
function drawCenterBadge(cx, cy) {
ctx.beginPath();
ctx.arc(cx, cy, 46, 0, Math.PI * 2);
ctx.fillStyle = "rgba(20, 10, 50, 0.9)";
ctx.fill();
ctx.strokeStyle = "#d4af37";
ctx.lineWidth =3;
ctx.stroke();
ctx.beginPath();
ctx.arc(cx, cy, 36, 0, Math.PI * 2);
ctx.strokeStyle = "rgba(255, 215, 110, 0.5)";
ctx.lineWidth =1.5;
ctx.stroke();
ctx.fillStyle = "#ffd86b";
ctx.font = "bold 42px serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText(currentZodiac ? currentZodiac.symbol : "☆", cx, cy + 2);
}
function drawLimitedGlow(cx, cy, radius) {
ctx.beginPath();
ctx.arc(cx, cy, radius, 0, Math.PI * 2);
const glow = ctx.createRadialGradient(cx, cy, radius -14, cx, cy, radius);
glow.addColorStop(0, "rgba(255, 180, 80, 0)");
glow.addColorStop(1, limitedGlowColor);
ctx.fillStyle = glow;
ctx.fill();
}
// Color helper functions
function hexToRgb(hex) {
const h = hex.replace("#", "");
const full = h.length ===3 ? h.split("").map(c=>c+c).join("") : h;
const num = parseInt(full,16);
return { r:(num>>16)&255, g:(num>>8)&255, b:num&255 };
}
function lightenColor(hex, percent) {
const {r,g,b}=hexToRgb(hex);
const nr = Math.min(255, Math.round(r + (255-r)*percent/100));
const ng = Math.min(255, Math.round(g + (255-g)*percent/100));
const nb = Math.min(255, Math.round(b + (255-b)*percent/100));
return `rgb(${nr}, ${ng}, ${nb})`;
}
function darkenColor(hex, percent) {
const {r,g,b}=hexToRgb(hex);
const nr = Math.round(r * (100-percent)/100);
const ng = Math.round(g * (100-percent)/100);
const nb = Math.round(b * (100-percent)/100);
return `rgb(${nr}, ${ng}, ${nb})`;
}
// DOM Elements (FIX: checkbox id match html: isLimitedCrystal)
const designHero = document.querySelector(".design-hero");
const designMain = document.getElementById("designMain");
const startDesignBtn = document.getElementById("startDesignBtn");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const step4 = document.getElementById("step4");
const birthdayInput = document.getElementById("birthdayInput");
const submitBirthday = document.getElementById("submitBirthday");
const tipMsg = document.querySelector(".tip-msg");
const zodiacIntro = document.getElementById("zodiacIntro");
const zodiacCrystalGrid = document.getElementById("zodiacCrystalGrid");
const designFrame = document.getElementById("designFrame");
const crystalCountEl = document.getElementById("crystalCount");
const priceTextEl = document.getElementById("priceText");
const isLimitedCrystalCheck = document.getElementById("isLimitedCrystal");
const undoBtn = document.getElementById("undoBtn");
const resetBtn = document.getElementById("resetBtn");
const addCustomToCartBtn = document.getElementById("addCustomToCart");
const successMsg = document.querySelector(".success-msg");
const previewModal = document.getElementById("previewModal");
const closePreviewBtn = document.querySelector(".close-preview");
const cancelAddToCart = document.getElementById("cancelAddToCart");
const confirmAddToCart = document.getElementById("confirmAddToCart");
const previewZodiacEl = document.getElementById("previewZodiac");
const previewCountEl = document.getElementById("previewCount");
const previewPriceEl = document.getElementById("previewPrice");
let currentZodiac = null;
let braceletCrystals = [];
let historyStack = [];
let dragFromIndex = null;
// Page initialize
window.addEventListener("load", () => {
step1.style.display = "none";
step2.style.display = "none";
step3.style.display = "none";
step4.style.display = "none";
});
// Start custom button
startDesignBtn.onclick = () => {
designHero.style.display = "none";
designMain.style.display = "block";
step1.style.display = "block";
};
// Match zodiac by birthday
submitBirthday.onclick = () => {
const birthdayVal = birthdayInput.value;
if(!birthdayVal){
tipMsg.innerText="Please select your birthday";
return;
  }
tipMsg.innerText="";
const [month, day] = birthdayVal.slice(5).split("-").map(Number);
let foundZodiac = null;
for(const z of zodiacList){
const [sM, sD] = z.start.split("-").map(Number);
const [eM, eD] = z.end.split("-").map(Number);
if(sM <= eM){
if( (month > sM || (month===sM && day >= sD)) && (month < eM || (month===eM && day <= eD)) ){
foundZodiac = z;
break;
      }
    }else{
if( (month >= sM && day >= sD) || (month <= eM && day <= eD) ){
foundZodiac = z;
break;
      }
    }
  }
if(!foundZodiac){
tipMsg.innerText="Cannot find zodiac, please check date.";
return;
  }
currentZodiac = foundZodiac;
zodiacIntro.innerText = `Your Zodiac: ${currentZodiac.symbol} ${currentZodiac.name}`;
zodiacCrystalGrid.innerHTML = "";
// Render 5 crystal cards for selected zodiac
currentZodiac.crystals.forEach(name => {
const color = crystalDotColors[name] || "#b0b0b0";
const card = document.createElement("div");
card.className = "crystal-card";
card.draggable = true;
card.dataset.name = name;
card.innerHTML = `
      <span class="crystal-dot" style="background:${color};"></span>
      <p>${name}</p>
    `;
card.addEventListener("dragstart", e => {
e.dataTransfer.setData("crystalName", name);
    });
zodiacCrystalGrid.appendChild(card);
  });
step1.style.display = "none";
step2.style.display = "block";
};
// Step 2 next button
document.querySelector(".next-step-btn").onclick = ()=>{
step2.style.display="none";
step3.style.display="block";
const price = calcTotalPrice();
step3.innerHTML = `
    <h3>Review your bracelet</h3>
    <p>Zodiac: ${currentZodiac.symbol} ${currentZodiac.name}</p>
    <p>Crystals: ${braceletCrystals.join(", ")}</p>
    <p>Total: HK$${price >0 ? price : "Need 8-21 crystals"}</p>
    <button class="next-step-btn btn-gold">Next →</button>
  `;
document.querySelector("#step3 .next-step-btn").onclick = () => {
step3.style.display="none";
step4.style.display="block";
document.getElementById("confirmZodiac").innerText = `${currentZodiac.symbol} ${currentZodiac.name}`;
document.getElementById("confirmCount").innerText = braceletCrystals.length;
document.getElementById("confirmPrice").innerText = "HK$"+calcTotalPrice();
  }
}
// Drag drop into design frame
designFrame.addEventListener("dragover",(e)=>e.preventDefault());
designFrame.addEventListener("drop",(e)=>{
e.preventDefault();
// 圆环内部交换珠子
if(dragFromIndex !== null){
const dropTargetIdx = Number(e.target.dataset.idx);
if(!isNaN(dropTargetIdx) && dragFromIndex !== dropTargetIdx){
saveHistory();
    [braceletCrystals[dragFromIndex], braceletCrystals[dropTargetIdx]] = [braceletCrystals[dropTargetIdx], braceletCrystals[dragFromIndex]];
dragFromIndex = null;
renderBraceletRing();
updateCountPrice();
return;
  }
dragFromIndex=null;
}
// 从素材库拖入新珠子
const crystalName = e.dataTransfer.getData("crystalName");
if(!crystalName) return;
saveHistory();
braceletCrystals.push(crystalName);
renderBraceletRing();
updateCountPrice();
})
// Render bead preview list below canvas
function renderBraceletRing(){
designFrame.querySelectorAll(".crystal-bead").forEach(el=>el.remove());
const placeholder = designFrame.querySelector(".placeholder-text");
if(braceletCrystals.length === 0){
placeholder.style.display="block";
return;
  }else{
placeholder.style.display="none";
  }
const radius = 200;
const centerX = designFrame.offsetWidth / 2;
const centerY = designFrame.offsetHeight / 2;
const total = braceletCrystals.length;
braceletCrystals.forEach((crystalName,idx)=>{
const angle = (idx / total) * 2 * Math.PI - Math.PI/2;
const x = centerX + radius * Math.cos(angle);
const y = centerY + radius * Math.sin(angle);
const color = crystalDotColors[crystalName] || "#b0b0b0";
const div = document.createElement("div");
div.className="crystal-bead";
div.dataset.idx = idx;
div.style.position = "absolute";
div.style.left = `${x}px`;
div.style.top = `${y}px`;
div.style.width = "36px";
div.style.height = "36px";
div.style.borderRadius = "50%";
div.style.background = color;
div.style.boxShadow = `0 0 10px ${color}`;
div.style.transform = "translate(-50%, -50%)";
div.title = crystalName;
div.draggable = true;
// Click to delete bead
div.addEventListener("click",()=>{
saveHistory();
braceletCrystals.splice(idx,1);
renderBraceletRing();
updateCountPrice();
})
// dragstart for swap beads inside ring
div.addEventListener("dragstart",e=>{
dragFromIndex = idx;
e.dataTransfer.setData("crystalName", "");
})
div.addEventListener("dragover",e=>e.preventDefault());
designFrame.appendChild(div);
  })
drawBraceletPreview();
}
// Calculate price
function calcTotalPrice(){
const count = braceletCrystals.length;
const pkgPrice = getPackagePrice(count);
if(pkgPrice === null) return 0;
let total = pkgPrice;
if(isLimitedCrystalCheck.checked) total += limitedExtraPrice;
return total;
}
// Update crystal count and price text
function updateCountPrice(){
const count = braceletCrystals.length;
crystalCountEl.innerText = count;
const price = calcTotalPrice();
if(price === 0){
priceTextEl.innerText = "Not eligible for package";
  }else{
priceTextEl.innerText = `HK$ ${price}`;
  }
drawBraceletPreview();
}
// Save state for undo
function saveHistory(){
historyStack.push([...braceletCrystals]);
if(historyStack.length > 20) historyStack.shift();
}
// Undo button
undoBtn.onclick = ()=>{
if(historyStack.length === 0) return;
braceletCrystals = historyStack.pop();
renderBraceletRing();
updateCountPrice();
}
// Reset button
resetBtn.onclick = ()=>{
saveHistory();
braceletCrystals = [];
renderBraceletRing();
updateCountPrice();
}
// Limited crystal checkbox toggle
isLimitedCrystalCheck.addEventListener("change",()=>{
updateCountPrice();
})
// Add custom bracelet to cart
addCustomToCartBtn.onclick = ()=>{
const finalPrice = calcTotalPrice();
// 校验不足8颗不能加入购物车
if(braceletCrystals.length < 8){
alert("Minimum 8 crystals required for bracelet package.");
return;
}
previewZodiacEl.innerText = `${currentZodiac.symbol} ${currentZodiac.name}`;
previewCountEl.innerText = braceletCrystals.length;
previewPriceEl.innerText = `HK$${finalPrice}`;
previewModal.style.display = "flex";
}
// Close preview modal
closePreviewBtn.onclick = ()=> previewModal.style.display = "none";
cancelAddToCart.onclick = ()=> previewModal.style.display = "none";

// ==========【修改后的确认加入购物车】==========
confirmAddToCart.onclick = ()=>{
  const cart = getCart();
  // 画布导出base64预览图
  const previewImageBase64 = canvas.toDataURL("image/png");

  const item = {
    type:"custom bracelet",
    zodiac: currentZodiac.name,
    symbol: currentZodiac.symbol,
    crystalList: [...braceletCrystals],
    count: braceletCrystals.length,
    price: calcTotalPrice(),
    quantity: 1, // 修复undefined
    isLimited: isLimitedCrystalCheck.checked,
    previewImage: previewImageBase64, // Canvas预览图
    createTime: new Date().toISOString()
  };
  cart.push(item);
  saveCart(cart);

  previewModal.style.display = "none";
  successMsg.style.display = "block";
  setTimeout(()=> successMsg.style.display="none",2500);
}
// ========== 手机触屏拖拽 ==========
let touchDragSource = null; // 标记拖拽来源：card / bead
let touchDragIndex = null;
let touchCrystalName = null;
let tempDragBead = null; // 触屏拖拽时跟随手指的悬浮预览珠子

// 给所有水晶素材卡片绑定触屏事件（在step2生成卡片后也要重新绑定！）
function bindCrystalCardTouch(){
  document.querySelectorAll(".crystal-card").forEach(card => {
    // 先移除旧事件防止重复绑定
    card.removeEventListener("touchstart", onCardTouchStart);
    card.addEventListener("touchstart", onCardTouchStart, {passive:false});
  });
}

// 素材卡片：手指按下开始拖拽新水晶
function onCardTouchStart(e){
  e.preventDefault();
  const touch = e.touches[0];
  touchDragSource = "card";
  touchCrystalName = e.currentTarget.dataset.name;

  // 创建跟随手指的预览珠子
  tempDragBead = document.createElement("div");
  tempDragBead.className="crystal-bead";
  const color = crystalDotColors[touchCrystalName];
  tempDragBead.style.cssText = `
    position:fixed;
    width:36px;height:36px;border-radius:50%;
    background:${color};box-shadow:0 0 10px ${color};
    pointer-events:none;z-index:9999;
    transform:translate(-50%,-50%);opacity:0.8;
  `;
  document.body.appendChild(tempDragBead);
  moveTempBead(touch.clientX, touch.clientY);

  document.addEventListener("touchmove", onTouchMove, {passive:false});
  document.addEventListener("touchend", onTouchEnd);
}

// 画布内珠子：手指按下，准备交换珠子
designFrame.addEventListener("touchstart", function(e){
  const beadEl = e.target.closest(".crystal-bead");
  if(!beadEl) return;
  e.preventDefault();
  const touch = e.touches[0];
  touchDragSource = "bead";
  touchDragIndex = Number(beadEl.dataset.idx);

  // 悬浮预览珠子
  tempDragBead = document.createElement("div");
  tempDragBead.className="crystal-bead";
  const crystalName = braceletCrystals[touchDragIndex];
  const color = crystalDotColors[crystalName];
  tempDragBead.style.cssText = `
    position:fixed;
    width:36px;height:36px;border-radius:50%;
    background:${color};box-shadow:0 0 10px ${color};
    pointer-events:none;z-index:9999;
    transform:translate(-50%,-50%);opacity:0.8;
  `;
  document.body.appendChild(tempDragBead);
  moveTempBead(touch.clientX, touch.clientY);

  document.addEventListener("touchmove", onTouchMove, {passive:false});
  document.addEventListener("touchend", onTouchEnd);
}, {passive:false});

// 手指移动，更新悬浮珠子位置
function onTouchMove(e){
  e.preventDefault(); // 阻止页面滚动
  const touch = e.touches[0];
  moveTempBead(touch.clientX, touch.clientY);
}
function moveTempBead(x,y){
  if(tempDragBead){
    tempDragBead.style.left = `${x}px`;
    tempDragBead.style.top = `${y}px`;
  }
}

// 手指松开：判断落点
function onTouchEnd(e){
  document.removeEventListener("touchmove", onTouchMove);
  document.removeEventListener("touchend", onTouchEnd);
  if(!tempDragBead) return;
  const touch = e.changedTouches[0];
  const dropX = touch.clientX;
  const dropY = touch.clientY;
  const frameRect = designFrame.getBoundingClientRect();

  // 删除悬浮预览珠
  tempDragBead.remove();
  tempDragBead = null;

  // 判断手指是否落在designFrame画布区域内
  const inFrame = dropX >= frameRect.left && dropX <= frameRect.right
    && dropY >= frameRect.top && dropY <= frameRect.bottom;

  if(touchDragSource === "card"){
    // 从素材卡片拖来的新水晶
    if(inFrame){
      saveHistory();
      braceletCrystals.push(touchCrystalName);
      renderBraceletRing();
      updateCountPrice();
    }
  }else if(touchDragSource === "bead"){
    // 圆环内交换珠子
    if(inFrame){
      // 查找落点最近的珠子
      let targetIdx = null;
      let minDist = Infinity;
      designFrame.querySelectorAll(".crystal-bead").forEach(bead=>{
        const beadRect = bead.getBoundingClientRect();
        const bx = beadRect.left + beadRect.width/2;
        const by = beadRect.top + beadRect.height/2;
        const dist = Math.hypot(bx-dropX, by-dropY);
        if(dist < minDist){
          minDist = dist;
          targetIdx = Number(bead.dataset.idx);
        }
      });
      if(targetIdx !== null && targetIdx !== touchDragIndex){
        saveHistory();
        [braceletCrystals[touchDragIndex], braceletCrystals[targetIdx]] =
        [braceletCrystals[targetIdx], braceletCrystals[touchDragIndex]];
        renderBraceletRing();
        updateCountPrice();
      }
    }
  }
  // 重置变量
  touchDragSource = null;
  touchDragIndex = null;
  touchCrystalName = null;
}