async function signUpFormHandler(event) {

  event.preventDefault();
  const firstName = document.querySelector('#firstName').value.trim();
  const lastName = document.querySelector('#lastName').value.trim();
  const email = document.querySelector('#email').value.trim();
  const postcode = document.querySelector('#postCode').value.trim();
  const password = document.querySelector('#typePassword').value.trim();
  const language = document.querySelector('#language').value.trim();
  const description = document.querySelector('#experienceBlurb').value.trim();
  if (firstName && lastName && email && postcode && password && language && description) {
    const response = await fetch('/api/students', {
      method: 'post',
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        postcode,
        password,
        languages_id: language,
        description,
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      const body = await response.json();
      document.location.replace('/dashboardstudent/' + body[0].id);
    } else {
      alert(response.statusText);
    }
  }
} document.querySelector('#signUp').addEventListener('click',signUpFormHandler);



