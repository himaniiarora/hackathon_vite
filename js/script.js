const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("error");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((err) => {
      console.error(err);
      errorMsg.innerText = "Invalid email or password!";
    });
});
