// show/hide password in input ------------------------------------------
const showPass = document.querySelectorAll(".input-group .show-pass");
const hidePass = document.querySelectorAll(".input-group .hide-pass");

showPass.forEach((icon, i) =>{
   icon.addEventListener("click", () => {
      let inputPass = icon.previousElementSibling.previousElementSibling;
      inputPass.type = "text";
      icon.style.display = "none";
      hidePass[i].style.display = "inline-block";
   });
})

hidePass.forEach((icon, i) =>{
   icon.addEventListener("click", () => {
   let inputPass = icon.previousElementSibling.previousElementSibling.previousElementSibling;
   inputPass.type = "password";
   icon.style.display = "none";
   showPass[i].style.display = "inline-block";
   });
});



const R_user_name = document.getElementById("R_user_name");
const R_email = document.getElementById("R_email");
const R_password = document.getElementById("R_password");
const R_password_confirm = document.getElementById("R_password_confirm");
const R_terms = document.getElementById("accept_terms")

const usernamePattern = {pattern: "^[A-Za-z][A-Za-z0-9_]{4,29}$", message: "Kullanıcı adı bir alfabe ile başlamalı ve en az 5 uzunlukta olmalıdır"};
const EmailPattern = {pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, message: "Geçersiz e-posta"};
const passwordPattern = {pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{4,}$/, message: "En az dört karakter, en az bir harf ve bir rakam olmalı"};
const passwordCfmPattern = { pattern: R_password.value, message: "Şifreler eşleşmiyor!" };


function checkFieldsR(input, obj) {
   let feedback = input.nextElementSibling;
   if(input.value !== ""){
      if(!(input.value.match(obj.pattern))){
         input.classList.add("is-invalid");
         feedback.textContent = obj.message
         return false
      }else{
         input.classList.replace("is-invalid", "is-valid") || input.classList.add("is-valid");
         feedback.textContent = "";
         return true
      }
   } else{
      input.classList.add("is-invalid");
      feedback.textContent = "Bu alan gereklidir!"
      return false
   }
}

function checkpasswordCfm_R(R_password_confirm, passwordCfmPattern) {
   let feedback = R_password_confirm.nextElementSibling;
   if(R_password_confirm.value !== ""){
      if(!(R_password_confirm.value === R_password.value)){
         R_password_confirm.classList.add("is-invalid");
         feedback.textContent = passwordCfmPattern.message;
         return false
      }else{
         R_password_confirm.classList.replace("is-invalid", "is-valid") || R_password_confirm.classList.add("is-valid");
         feedback.textContent = "";
         return true
      }
   } else{
      R_password_confirm.classList.add("is-invalid");
      feedback.textContent = "Bu alan gereklidir!"
      return false
   }
}


let checkUser = R_user_name.oninput = () => checkFieldsR(R_user_name, usernamePattern);
let checkEmail = R_email.oninput = () => checkFieldsR(R_email, EmailPattern);
let checkPass = R_password.oninput = () => checkFieldsR(R_password, passwordPattern);
let checkPassC = R_password_confirm.oninput = () => checkpasswordCfm_R(R_password_confirm, passwordCfmPattern);

let checkTerms = R_terms.onchange = () => {
   if(!R_terms.checked){
      R_terms.nextElementSibling.nextElementSibling.textContent = "Lütfen şartlar ve koşulları kabul edin";
      R_terms.classList.add("is-invalid");
   }else{
      R_terms.classList.replace("is-invalid", "is-valid") || R_terms.classList.add("is-valid");
      R_terms.nextElementSibling.nextElementSibling.textContent = "";
      return true
   }
}


const form_register = document.querySelector("#form_register")

function handelRegister(e) {
   e.preventDefault();

   !checkTerms() && R_terms.focus();
   !checkPassC() && R_password_confirm.focus();
   !checkPass() && R_password.focus();
   !checkEmail() && R_email.focus();
   !checkUser() && R_user_name.focus();

   if(checkUser() && checkEmail() && checkPass() && checkPassC() && checkTerms()){
      let data = {username:R_user_name.value.trim(), email: R_email.value.trim(), password : R_password.value.trim()};
      localStorage.setItem("userRegistration", JSON.stringify(data))
      setTimeout( () => window.location.assign("signin.html") ,1500)
   }
}
form_register.addEventListener("submit", handelRegister);
