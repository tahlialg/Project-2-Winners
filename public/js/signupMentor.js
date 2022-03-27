async function signUpFormHandler(event) {

  event.preventDefault();
  const firstName = document.querySelector('#fristName').value.trim();
  const lastName = document.querySelector('#lastName').value.trim();
  const email = document.querySelector('#email').value.trim();
  const postcode = document.querySelector('#postCode').value.trim();
  const password = document.querySelector('#typePassword').value.trim();
  const language = document.querySelector('#language').value.trim();
  const description = document.querySelector('#experienceBlurb').value.trim();
  if (firstName && lastName && email && postcode && password && language && description) {
    const response = await fetch('/api/mentor', {
      method: 'post',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        postcode,
        password,
        language,
        description
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/mentor-dasboard');
    } else {
      alert(response.statusText);
    }
  }
} document.querySelector('#signUp').addEventListener('click',signUpFormHandler);



