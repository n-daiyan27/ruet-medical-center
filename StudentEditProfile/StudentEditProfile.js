console.log("I am in");
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
console.log(email);
 
