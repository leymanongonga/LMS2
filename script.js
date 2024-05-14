document.addEventListener('DOMContentLoaded',() => {
   const registerForm = document.getElementById ('registere-form');
   const loginForm = document.getElementById('login-form');
   const logoutForm = document.getElementById('logout-form');

    registerForm.addEventListener('submit', async (e) => {
         e.preventDefault();
 
         const formData = new formData(registerForm);
         const username = new formData('username');
         const password = new formData('password'); 
         const email = new formData('email');
         const full_name = new formData('full_name');

         try{
            const response = await fetch('/register', {
                 method: 'post',
                 headers : {
                    'content-type': 'application/json'
                 },
                 body: JSON.stringify({username, password, email, full_name })
            });
            if(response.ok){
                 alert('registration was successful');
            } else {
                alert('registration was not successful'); 
            }
         }catch(error) {
            console.error('error', error);
            alert('an error occured');
         }
    })
})
