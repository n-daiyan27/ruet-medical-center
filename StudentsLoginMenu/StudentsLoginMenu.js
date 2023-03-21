console.log("I am in");
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
console.log(email);
 
const firstName=document.getElementById('fname');
const roll = document.getElementById('roll');
const fullName=document.getElementById('fullName');
const dept=document.getElementById('dept');
const session=document.getElementById('session');
const emailid=document.getElementById('email');
const mob=document.getElementById('mobile');
const jonmo=document.getElementById('dob');
const gender=document.getElementById('gender');
const blood=document.getElementById('b-group');

const editPro=document.getElementById('editProfile');
const myPro=document.getElementById('myprofile');
const appoint = document.getElementById('appoint');
 
fetch(`http://localhost:6204/studentlist/${email}`)
.then(res=>res.json())
.then(data=>{
    console.log(data);
    firstName.innerText=data[0].fname;
    roll.innerText=data[0].roll;
    fullName.innerText=data[0].fname+' '+data[0].lname;
    dept.innerText=data[0].dept;
    session.innerText=data[0].session;
    emailid.innerText=data[0].email;
    mob.innerText=data[0].mobile;
    jonmo.innerText=data[0].birthday;
    gender.innerText=data[0].gender;
    blood.innerText=data[0].blood;   
    
    
    

})

editPro.style.cursor="pointer";
appoint.style.cursor="pointer";
myPro.style.cursor="pointer";

editPro.addEventListener("click",()=>{
    location.href=`../StudentEditProfile/StudentEditProfile.html?email=${email}`;
});

myPro.addEventListener("click",()=>{
    location.href=`../StudentsLoginMenu/StudentsLoginMenu.html?email=${email}`;
});

appoint.addEventListener("click",()=>{ 
    location.href=`../AppoinmentRelated/DoctorsList.html?email=${email}`;
})