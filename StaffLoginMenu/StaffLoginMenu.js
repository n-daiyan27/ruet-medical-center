console.log('I am connected');
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
console.log(email);

const staffName=document.getElementById('name');
logout.style.cursor="pointer";

logout.addEventListener("click",()=>{
    location.href='../HomePage/index.html';
});

fetch(`http://localhost:6204/stafflist/${email}`)
.then(res=>res.json())
.then(data=>{
    console.log(data);
    staffName.innerText=data[0].name;
})