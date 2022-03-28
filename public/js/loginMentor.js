// const res = require("express/lib/response");

// const res = require("express/lib/response");

async function loginFormHandler(event) {
  event.preventDefault();
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/mentors/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    // console.log(response.id);
    if (response.ok) {
      const body = await response.json();

      document.location.replace("/dashboardmentor/" + body.id);
    } else {
      alert("Incorrect email or password");
      document.location.reload();
    }
  } else if (!password || !email) {
    alert("You need to provide both: email and password");
  }
}
document.querySelector("#logIn").addEventListener("click", loginFormHandler);
