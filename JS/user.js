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


//===================== member login ===================
// new member
const registerForm = document.getElementById("registerForm");
if(registerForm){
  registerForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const pw = document.getElementById("regPw").value;
    const pw2 = document.getElementById("regPw2").value;
    if(pw !== pw2){
      alert("Password not match");
      return;
    }
    const userData = {name,email,pw};
    localStorage.setItem("kitakiraMember", JSON.stringify(userData));
    alert("Register success!");
    window.location.href = "member-info.html";
  })
}

// login member
const loginForm = document.getElementById("loginForm");
if(loginForm){
  loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const pw = document.getElementById("loginPw").value;
    const savedUser = JSON.parse(localStorage.getItem("kitakiraMember"));
    if(savedUser && savedUser.email === email && savedUser.pw === pw){
      alert("Login success");
      localStorage.setItem("kitakiraLogin", "true");
      window.location.href = "index.html";
    }else{
      alert("Email or password wrong");
    }
  })
}
