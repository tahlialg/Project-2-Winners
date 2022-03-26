async function signUpFormHandler(event) {

  event.preventDefault();
  const firstName = document.querySelector('#fristName').value.trim();
  const lastName = document.querySelector('#lastName').value.trim();
  const email = document.querySelector('#email').value.trim();
  const postcode = document.querySelector('#postCode').value.trim();
  const password = document.querySelector('#typePassword').value.trim();
  const language = document.querySelector('#language').value.trim();

  if (firstName && lastName && email && postcode && password & language) {
    const response = await fetch('/api/student', {
      method: 'post',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        postcode,
        password,
        language
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/mentee-dasboard');
    } else {
      alert(response.statusText);
    }
  }
} document.querySelector('#signUp').addEventListener('click',signUpFormHandler);



