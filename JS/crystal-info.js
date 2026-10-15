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

//============ crystal info ==========================


// crystal-info.js
document.addEventListener('DOMContentLoaded', function(){
  // 滚动入场动画
    const animateItems = document.querySelectorAll('.scroll-animate');
    const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
        entry.target.classList.add('active');
        }
    })
    }, { threshold:0.1 });

animateItems.forEach(item => observer.observe(item));

  // back to tap
    const backTopBtn = document.createElement('div');
    backTopBtn.classList.add('back-to-top');
    backTopBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
    document.body.appendChild(backTopBtn);

    window.addEventListener('scroll', ()=>{
    if(window.scrollY > 400){
        backTopBtn.classList.add('show');
    }else{
        backTopBtn.classList.remove('show');
    }
    })
    backTopBtn.addEventListener('click', ()=>{
    window.scrollTo({top:0, behavior:'smooth'});
    })
})
