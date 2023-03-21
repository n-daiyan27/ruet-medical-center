console.log("I am in");
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
console.log(email);
 
const doctorName=document.getElementById('name');
const desi = document.getElementById('desig');
const fullName=document.getElementById('f-name');
const emailid=document.getElementById('mail');
const mob=document.getElementById('mobile');
const special= document.getElementById('special');
const prac= document.getElementById('prac');
const jonmo=document.getElementById('dob');
const duty=document.getElementById('duty');
const appointed=document.getElementById('appointmentlist');
const myProfile=document.getElementById('myprofile');
const changePass=document.getElementById('changepass');
const prescribe= document.getElementById('prescribe');
const logout= document.getElementById('logout')

fetch(`http://localhost:6204/doctorlist/${email}`)
.then(res=>res.json())
.then(data=>{
    console.log(data); 
    doctorName.innerText=data[0].name;
    prac.innerText=data[0].practice;
    fullName.innerText=data[0].name;
    special.innerText= data[0].special
    desi.innerText=data[0].designation;
    emailid.innerText=data[0].email;
    jonmo.innerText=data[0].birth;
    mob.innerText=data[0].mobile;
    if(data[0].shift1!=null&&data[0].shift2===null){
        duty.innerText=data[0].shift1;
    }
    if(data[0].shift1===null&&data[0].shift2!=null){
        duty.innerText=data[0].shift2;
    }
    if(data[0].shift1!=null&&data[0].shift2!=null){
        let str= data[0].shift1+', '+data[0].shift2;
        duty.innerText=str;
    }
    
    myProfile.style.cursor="pointer";
    appointed.style.cursor="pointer";
    changePass.style.cursor="pointer";
    prescribe.style.cursor="pointer";
    logout.style.cursor="pointer";
 
    myProfile.addEventListener("click",()=>{
        console.log("i am clicked")
        location.href=`../DoctorsLoginMenu/DoctorsLoginMenu.html?email=${email}`;
    })

    appointed.addEventListener("click",()=>{
        console.log("i am clicked")
        location.href=`../AppointmentList/AppointmentList.html?email=${email}`;
    })

    prescribe.addEventListener("click",()=>{
        console.log("i am clicked")
        location.href=`../AppointmentList/AppointmentList.html?email=${email}`;
    })
    //console.log(data[0].birth);
    logout.addEventListener("click",()=>{
        location.href='../HomePage/index.html';
    });

})